import { useState, useRef } from 'react';
import { useAppActions } from '../Hooks/useAppActions';
import { useAppSelector } from '../Hooks/useAppSelector';

type UseDragAndDropElementProps = {
  slideId: string,
};

function useDragAndDropObject({ slideId }: UseDragAndDropElementProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElementId, setDraggedElementId] = useState<string | null>(null);
  const [temporaryPosition, setTemporaryPosition] = useState<{ x: number, y: number } | null>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialPosition = useRef<{ x: number; y: number } | null>(null);

  const { changeObjectPosition } = useAppActions();
  const editor = useAppSelector((state) => state);

  function handleElementMouseDown(event: React.MouseEvent<HTMLDivElement>, elementId: string): void {
    event.preventDefault();
    setIsDragging(true);
    setDraggedElementId(elementId);
    setTemporaryPosition(null);
    dragStartPos.current = { x: event.clientX, y: event.clientY };

    const slide = editor.presentation.slides.find((s) => s.id === slideId);
    const element = slide?.content.find((e) => e.id === elementId);

    if (element) {
      initialPosition.current = { x: element.position.x, y: element.position.y };
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

    const newX = Math.max(0, Math.min(initialPosition.current.x + deltaX, 935 - element.size.width - 1));
    const newY = Math.max(0, Math.min(initialPosition.current.y + deltaY, 525 - element.size.height - 1));

    setTemporaryPosition({ x: newX, y: newY });
  }

  function handleElementMouseUp(): void {
    if (temporaryPosition && draggedElementId) {
      changeObjectPosition(editor, slideId, draggedElementId, temporaryPosition.x, temporaryPosition.y);
    }

    setIsDragging(false);
    setDraggedElementId(null);
    setTemporaryPosition(null);
    initialPosition.current = null;
  }

  return {
    isDragging,
    temporaryPosition,
    handleElementMouseDown,
    handleElementMouseMove,
    handleElementMouseUp,
  };
}

export { useDragAndDropObject };