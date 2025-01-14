import { useState, useRef } from 'react';
import { useAppActions } from '../Hooks/useAppActions';
import { useAppSelector } from '../Hooks/useAppSelector';

const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;

type UseResizeObjectProps = {
    slideId: string,
};

type ResizeHandle = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' |
    'middle-left' | 'middle-right' | 'top-middle' | 'bottom-middle';

function useResizeObject({ slideId }: UseResizeObjectProps) {
    const [isResizing, setIsResizing] = useState(false);
    const [resizingElementId, setResizingElementId] = useState<string | null>(null);
    const [activeHandle, setActiveHandle] = useState<ResizeHandle | null>(null);
    const [temporarySize, setTemporarySize] = useState<{ width: number, height: number } | null>(null);
    const [temporaryPosition, setTemporaryPosition] = useState<{ x: number, y: number } | null>(null);

    const startPos = useRef({ x: 0, y: 0 });
    const initialSize = useRef<{ width: number; height: number } | null>(null);
    const initialPosition = useRef<{ x: number; y: number } | null>(null);

    const { changeObjectSize } = useAppActions();
    const editor = useAppSelector((state) => state);

    function handleResizeMouseDown(
        event: React.MouseEvent<HTMLDivElement>,
        elementId: string,
        handle: ResizeHandle
    ): void {
        event.preventDefault();
        event.stopPropagation();

        setIsResizing(true);
        setResizingElementId(elementId);
        setActiveHandle(handle);
        setTemporarySize(null);
        setTemporaryPosition(null);

        startPos.current = { x: event.clientX, y: event.clientY };

        const slide = editor.presentation.slides.find((s) => s.id === slideId);
        const element = slide?.content.find((e) => e.id === elementId);

        if (element) {
            initialSize.current = { width: element.size.width, height: element.size.height };
            initialPosition.current = { x: element.position.x, y: element.position.y };
        }
    }

    function handleResizeMouseMove(event: React.MouseEvent<HTMLDivElement>): void {
        if (!isResizing || !resizingElementId || !initialSize.current || !initialPosition.current || !activeHandle) return;

        const deltaX = event.clientX - startPos.current.x;
        const deltaY = event.clientY - startPos.current.y;

        const slide = editor.presentation.slides.find((s) => s.id === slideId);
        if (!slide) return;

        const element = slide.content.find((el) => el.id === resizingElementId);
        if (!element) return;

        let newWidth = initialSize.current.width;
        let newHeight = initialSize.current.height;
        let newX = initialPosition.current.x;
        let newY = initialPosition.current.y;

        switch (activeHandle) {
            case 'top-left':
                newWidth = Math.max(10, initialSize.current.width - deltaX);
                newHeight = Math.max(10, initialSize.current.height - deltaY);
                newX = initialPosition.current.x + initialSize.current.width - newWidth;
                newY = initialPosition.current.y + initialSize.current.height - newHeight;
                break;
            case 'top-right':
                newWidth = Math.max(10, initialSize.current.width + deltaX);
                newHeight = Math.max(10, initialSize.current.height - deltaY);
                newY = initialPosition.current.y + initialSize.current.height - newHeight;
                break;
            case 'bottom-left':
                newWidth = Math.max(10, initialSize.current.width - deltaX);
                newHeight = Math.max(10, initialSize.current.height + deltaY);
                newX = initialPosition.current.x + initialSize.current.width - newWidth;
                break;
            case 'bottom-right':
                newWidth = Math.max(10, initialSize.current.width + deltaX);
                newHeight = Math.max(10, initialSize.current.height + deltaY);
                break;
            case 'middle-left':
                newWidth = Math.max(10, initialSize.current.width - deltaX);
                newX = initialPosition.current.x + initialSize.current.width - newWidth;
                break;
            case 'middle-right':
                newWidth = Math.max(10, initialSize.current.width + deltaX);
                break;
            case 'top-middle':
                newHeight = Math.max(10, initialSize.current.height - deltaY);
                newY = initialPosition.current.y + initialSize.current.height - newHeight;
                break;
            case 'bottom-middle':
                newHeight = Math.max(10, initialSize.current.height + deltaY);
                break;
        }

        if (newX < 0) {
            newX = 0;
            newWidth = initialPosition.current.x + initialSize.current.width;
        }

        if (newY < 0) {
            newY = 0;
            newHeight = initialPosition.current.y + initialSize.current.height;
        }

        if (newX + newWidth > SLIDE_WIDTH) {
            if (activeHandle.includes('left')) {
                newX = SLIDE_WIDTH - newWidth;
            } else {
                newWidth = SLIDE_WIDTH - newX;
            }
        }

        if (newY + newHeight > SLIDE_HEIGHT) {
            if (activeHandle.includes('top')) {
                newY = SLIDE_HEIGHT - newHeight;
            } else {
                newHeight = SLIDE_HEIGHT - newY;
            }
        }

        newWidth = Math.max(35, newWidth);
        newHeight = Math.max(35, newHeight);

        setTemporarySize({ width: newWidth, height: newHeight });
        setTemporaryPosition({ x: newX, y: newY });
    }

    function handleResizeMouseUp(): void {
        if (temporarySize && temporaryPosition && resizingElementId) {
            changeObjectSize(
                editor,
                slideId,
                resizingElementId,
                temporarySize.width,
                temporarySize.height,
                temporaryPosition.x,
                temporaryPosition.y
            );
        }

        setIsResizing(false);
        setResizingElementId(null);
        setActiveHandle(null);
        setTemporarySize(null);
        setTemporaryPosition(null);
        initialSize.current = null;
        initialPosition.current = null;
    }

    return {
        isResizing,
        temporarySize,
        temporaryPosition,
        handleResizeMouseDown,
        handleResizeMouseMove,
        handleResizeMouseUp,
    };
}

export { useResizeObject };