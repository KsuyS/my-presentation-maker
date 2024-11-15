import { useState, useCallback } from 'react';

export type ResizeDirection = 
    'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 
    'top' | 'bottom' | 'left' | 'right';

interface UseResizableProps {
    initialWidth: number;
    initialHeight: number;
    onResize: (width: number, height: number) => void;
}

export const useResizable = ({ initialWidth, initialHeight, onResize }: UseResizableProps) => {
    const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
    const [direction, setDirection] = useState<ResizeDirection | null>(null);
    const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null);
    const [isResizing, setIsResizing] = useState(false);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isResizing || !direction || !startPosition) return;

        let newWidth = size.width;
        let newHeight = size.height;

        const deltaX = e.clientX - startPosition.x;
        const deltaY = e.clientY - startPosition.y;

        switch (direction) {
            case 'top-left':
                newWidth -= deltaX;
                newHeight -= deltaY;
                break;
            case 'top-right':
                newWidth += deltaX;
                newHeight -= deltaY;
                break;
            case 'bottom-left':
                newWidth -= deltaX;
                newHeight += deltaY;
                break;
            case 'bottom-right':
                newWidth += deltaX;
                newHeight += deltaY;
                break;
            case 'top':
                newHeight -= deltaY;
                break;
            case 'bottom':
                newHeight += deltaY;
                break;
            case 'left':
                newWidth -= deltaX;
                break;
            case 'right':
                newWidth += deltaX;
                break;
        }

        // Limit minimum sizes
        if (newWidth > 20 && newHeight > 20) {
            setSize({ width: newWidth, height: newHeight });
            onResize(newWidth, newHeight);
        }
    }, [size, direction, startPosition, isResizing, onResize]);

    const startResize = useCallback((resizeDirection: ResizeDirection) => {
        setDirection(resizeDirection);
        setStartPosition(null);
        setIsResizing(true);

        const mouseMoveHandler = (e: MouseEvent) => {
            if (!startPosition) {
                setStartPosition({ x: e.clientX, y: e.clientY });
            }
            handleMouseMove(e);
        };

        const mouseUpHandler = () => {
            setDirection(null);
            setStartPosition(null);
            setIsResizing(false);
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);

        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };
    }, [handleMouseMove]);

    return { size, startResize };
};