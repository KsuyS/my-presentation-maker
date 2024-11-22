import { useState, useCallback, useEffect } from 'react';

type ResizeDirection = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right';

export function useResizeObject(
    onResizeEnd: (newSize: { width: number; height: number }) => void,
    initialSize: { width: number; height: number },
    initialPosition: { x: number; y: number },
    minSize: { width: number; height: number }
) {
    const [size, setSize] = useState(initialSize);
    const [position, setPosition] = useState(initialPosition);
    const [isResizing, setIsResizing] = useState(false);
    const [startMousePos, setStartMousePos] = useState<{ x: number; y: number } | null>(null);
    const [resizeDirection, setResizeDirection] = useState<ResizeDirection | null>(null);

    const startResizing = useCallback((event: React.MouseEvent<HTMLDivElement>, direction: ResizeDirection) => {
        event.stopPropagation();
        setIsResizing(true);
        setStartMousePos({ x: event.clientX, y: event.clientY });
        setResizeDirection(direction);
    }, []);

    const onMouseMove = useCallback((event: MouseEvent) => {
        if (!isResizing || !startMousePos || !resizeDirection) return;

        const dx = event.clientX - startMousePos.x;
        const dy = event.clientY - startMousePos.y;

        let newWidth = size.width;
        let newHeight = size.height;
        let newPosition = { ...position };

        switch (resizeDirection) {
            case 'top-left':
                newWidth = Math.max(minSize.width, size.width - dx);
                newHeight = Math.max(minSize.height, size.height - dy);
                newPosition.x += dx;
                newPosition.y += dy;
                break;
            case 'top-right':
                newWidth = Math.max(minSize.width, size.width + dx);
                newHeight = Math.max(minSize.height, size.height - dy);
                newPosition.y += dy; // Move down if height decreases
                break;
            case 'bottom-left':
                newWidth = Math.max(minSize.width, size.width - dx);
                newHeight = Math.max(minSize.height, size.height + dy);
                newPosition.x += dx; // Move right if width decreases
                break;
            case 'bottom-right':
                newWidth = Math.max(minSize.width, size.width + dx);
                newHeight = Math.max(minSize.height, size.height + dy);
                break;
            case 'top':
                newHeight = Math.max(minSize.height, size.height - dy);
                newPosition.y += dy; // Move down if height decreases
                break;
            case 'bottom':
                newHeight = Math.max(minSize.height, size.height + dy);
                break;
            case 'left':
                newWidth = Math.max(minSize.width, size.width - dx);
                newPosition.x += dx; // Move right if width decreases
                break;
            case 'right':
                newWidth = Math.max(minSize.width, size.width + dx);
                break;
        }

        // Update state only if there is a change
        if (newWidth !== size.width || newHeight !== size.height || 
            newPosition.x !== position.x || newPosition.y !== position.y) {
            setSize({ width: newWidth, height: newHeight });
            setPosition(newPosition);
        }
    }, [isResizing, startMousePos, resizeDirection, size, position, minSize]);

    const stopResizing = useCallback(() => {
        if (isResizing) {
            onResizeEnd(size);
            setIsResizing(false);
            setStartMousePos(null);
            setResizeDirection(null);
        }
    }, [isResizing, size, onResizeEnd]);

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', stopResizing);
        }
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [isResizing, onMouseMove, stopResizing]);

    return { size, position, startResizing };
}