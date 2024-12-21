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
  
  const { changeObjectPosition } = useAppActions();
  const editor = useAppSelector((state) => state);

  const elementRef = useRef<{ x: number; y: number } | null>(null);

  function handleElementMouseDown(event: React.MouseEvent<HTMLDivElement>, elementId: string): void {
    event.preventDefault();
    setIsDragging(true);
    setDraggedElementId(elementId);
    dragStartPos.current = { x: event.clientX, y: event.clientY };

    const slide = editor.presentation.slides.find((s) => s.id === slideId);
    const element = slide?.content.find((e) => e.id === elementId);
    if (element) {
        elementRef.current = { x: element.position.x, y: element.position.y };
    }
    
  }

  function handleElementMouseMove(event: React.MouseEvent<HTMLDivElement>): void {
    if (!isDragging || !draggedElementId) return;

    const deltaX = event.clientX - dragStartPos.current.x;
    const deltaY = event.clientY - dragStartPos.current.y;

    const slide = editor.presentation.slides.find((s) => s.id === slideId);
    if (!slide) return;

    const element = slide.content.find((el) => el.id === draggedElementId);
    if (!element) return;

    const startX = elementRef.current ? elementRef.current.x : element.position.x;
    const startY = elementRef.current ? elementRef.current.y : element.position.y;

    const newX = Math.max(0, Math.min(startX + deltaX, 935 - element.size.width));
    const newY = Math.max(0, Math.min(startY + deltaY, 525 - element.size.height));

    changeObjectPosition(editor, slideId, draggedElementId, newX, newY);
  }

  function handleElementMouseUp(): void {
    setIsDragging(false);
    setDraggedElementId(null);
    elementRef.current = null;
  }

  return {
    isDragging,
    handleElementMouseDown,
    handleElementMouseMove,
    handleElementMouseUp,
  };
}

export { useDragAndDropObject };