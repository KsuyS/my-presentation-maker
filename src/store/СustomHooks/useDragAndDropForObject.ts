import { useState, useRef } from 'react';
import { useAppActions } from '../Hooks/useAppActions';
import { useAppSelector } from '../Hooks/useAppSelector';

type UseDragAndDropElementProps = {
  slideId: string;
};

function useDragAndDropObject({ slideId }: UseDragAndDropElementProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElementId, setDraggedElementId] = useState<string | null>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialPosition = useRef<{ x: number; y: number } | null>(null);
  const currentPosition = useRef<{ x: number; y: number } | null>(null);

  const { changeObjectPosition } = useAppActions();
  const editor = useAppSelector((state) => state);

  function handleElementMouseDown(event: React.MouseEvent<HTMLDivElement>, elementId: string): void {
    event.preventDefault();
    setIsDragging(true);
    setDraggedElementId(elementId);
    dragStartPos.current = { x: event.clientX, y: event.clientY };

    const slide = editor.presentation.slides.find((s) => s.id === slideId);
    const element = slide?.content.find((e) => e.id === elementId);

    if (element) {
      initialPosition.current = { x: element.position.x, y: element.position.y };
      currentPosition.current = { x: element.position.x, y: element.position.y };
    }
  }

    function handleElementMouseMove(event: React.MouseEvent<HTMLDivElement>): void {
        if (!isDragging || !draggedElementId || !initialPosition.current) return;

        const deltaX = event.clientX - dragStartPos.current.x;
        const deltaY = event.clientY - dragStartPos.current.y;

        const slide = editor.presentation.slides.find((s) => s.id === slideId);
        if (!slide) return;

        const element = slide.content.find((el) => el.id === draggedElementId);
        if (!element) return;

        const newX = Math.max(0, Math.min(initialPosition.current.x + deltaX, 935 - element.size.width));
        const newY = Math.max(0, Math.min(initialPosition.current.y + deltaY, 525 - element.size.height));

        currentPosition.current = {x: newX, y: newY}
    }


  function handleElementMouseUp(): void {
    if (initialPosition.current && draggedElementId && currentPosition.current) {
      console.log('Initial Position:', initialPosition.current);
      changeObjectPosition(editor, slideId, draggedElementId, currentPosition.current.x, currentPosition.current.y)
    }

    setIsDragging(false);
    setDraggedElementId(null);
    initialPosition.current = null;
    currentPosition.current = null;
  }

  return {
    isDragging,
    handleElementMouseDown,
    handleElementMouseMove,
    handleElementMouseUp,
  };
}

export { useDragAndDropObject };
