import { useState, useRef } from 'react';
import { useAppActions } from '../Hooks/useAppActions';
import { useAppSelector } from '../Hooks/useAppSelector';

type UseResizeElementProps = {
  slideId: string;
  minWidth?: number;
  minHeight?: number;
};

function useResizeObject({ slideId, minWidth = 20, minHeight = 20 }: UseResizeElementProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [resizedElementId, setResizedElementId] = useState<string | null>(null);
  const startSize = useRef({ width: 0, height: 0 });
  const startMousePos = useRef({ x: 0, y: 0 });
  const initialPosition = useRef({ x: 0, y: 0 });
  const resizeDirection = useRef<string | null>(null);
  const editor = useAppSelector(state => state);
  const { changeObjectSize } = useAppActions();

  function handleResizeMouseDown(event: React.MouseEvent<HTMLDivElement>, elementId: string, direction: string): void {
    event.preventDefault();
    setIsResizing(true);
    setResizedElementId(elementId);
    resizeDirection.current = direction;
    startMousePos.current = { x: event.clientX, y: event.clientY };

    const slide = editor.presentation.slides.find(s => s.id === slideId);
    const element = slide?.content.find(e => e.id === elementId);
    if (element) {
      startSize.current = { width: element.size.width, height: element.size.height };
      initialPosition.current = { x: element.position.x, y: element.position.y };
    }
  }

  function handleResizeMouseMove(event: React.MouseEvent<HTMLDivElement>): void {
    if (!isResizing || !resizedElementId) {
      return;
    }

    const deltaX = event.clientX - startMousePos.current.x;
    const deltaY = event.clientY - startMousePos.current.y;

    let newWidth = startSize.current.width;
    let newHeight = startSize.current.height;
    let newX = initialPosition.current.x;
    let newY = initialPosition.current.y;

    switch (resizeDirection.current) {
      case 'top-left':
        newX += deltaX;
        newY += deltaY;
        newWidth = Math.max(minWidth, startSize.current.width - deltaX);
        newHeight = Math.max(minHeight, startSize.current.height - deltaY);
        break;

      case 'top-right':
        newY += deltaY;
        newWidth = Math.max(minWidth, startSize.current.width + deltaX);
        newHeight = Math.max(minHeight, startSize.current.height - deltaY);
        break;

      case 'bottom-left':
        newX += deltaX;
        newWidth = Math.max(minWidth, startSize.current.width - deltaX);
        newHeight = Math.max(minHeight, startSize.current.height + deltaY);
        break;

      case 'bottom-right':
        newWidth = Math.max(minWidth, startSize.current.width + deltaX);
        newHeight = Math.max(minHeight, startSize.current.height + deltaY);
        break;

      case 'middle-left':
        newX += deltaX;
        newWidth = Math.max(minWidth, startSize.current.width - deltaX);
        break;

      case 'middle-right':
        newWidth = Math.max(minWidth, startSize.current.width + deltaX);
        break;

      case 'top-middle':
        newY += deltaY;
        newHeight = Math.max(minHeight, startSize.current.height - deltaY);
        break;

      case 'bottom-middle':
        newHeight = Math.max(minHeight, startSize.current.height + deltaY);
        break;
    }

    if (newX < 0) {
      newWidth += newX;
      newX = 0;
    }
    if (newY < 0) {
      newHeight += newY;
      newY = 0;
    }

    changeObjectSize(editor, slideId, resizedElementId, newWidth, newHeight, newX, newY);
  }

  function handleResizeMouseUp(): void {
    setIsResizing(false);
    setResizedElementId(null);
    resizeDirection.current = null;
  }

  return {
    isResizing,
    handleResizeMouseDown,
    handleResizeMouseMove,
    handleResizeMouseUp,
  };
}

export { useResizeObject };
