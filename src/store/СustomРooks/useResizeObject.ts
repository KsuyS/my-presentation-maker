import { useState, useCallback } from 'react';

type ResizeHandle = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'top' | 'bottom' | 'left' | 'right';

function useResizeObject(
    initialPosition: { x: number; y: number },
    initialSize: { width: number; height: number },
    onResizeEnd: (newPosition: { x: number; y: number }, newSize: { width: number; height: number }) => void,
    scale: number,
    minSize: { width: number; height: number },
) {
    const [position, setPosition] = useState(initialPosition);
    const [size, setSize] = useState(initialSize);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeHandle, setResizeHandle] = useState<ResizeHandle | null>(null);

    const startResize = useCallback((handle: ResizeHandle) => {
        setIsResizing(true);
        setResizeHandle(handle);
    }, []);

    const stopResize = useCallback(() => {
        if (isResizing) {
            onResizeEnd(position, size);
            setIsResizing(false);
            setResizeHandle(null);
        }
    }, [isResizing, onResizeEnd, position, size]);

    const resize = useCallback((event: MouseEvent) => {
        if (!isResizing || !resizeHandle) return;

        const scaledMovementX = event.movementX / scale;
        const scaledMovementY = event.movementY / scale;

        let newWidth = size.width;
        let newHeight = size.height;
        let newPosition = { ...position };

        switch (resizeHandle) {
            case 'topLeft':
                break;
            case 'topRight':
                break;
            case 'bottomLeft':
                break;
            case 'bottomRight':
                newWidth = Math.max(minSize.width, size.width + scaledMovementX);
                newHeight = Math.max(minSize.height, size.height + scaledMovementY);
                break;
            case 'top':
                break;
            case 'bottom':
                newHeight = Math.max(minSize.height, size.height + scaledMovementY);
                break;
            case 'left':
                break;
            case 'right':
                newWidth = Math.max(minSize.width, size.width + scaledMovementX);
                break;
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition(newPosition);
    }, [isResizing, resizeHandle, position, size, minSize, scale]);

    console.log('w', size.width * scale, 'h', size.height * scale);

    return {
        position,
        size,
        startResize,
        stopResize,
        resize,
    };
}

export { useResizeObject };