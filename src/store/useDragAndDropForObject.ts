import { useState, useEffect } from 'react';

function useDragAndDropObject(
    onDragEnd: (newPosition: { x: number; y: number }) => void,
    slideWidth: number,
    slideHeight: number,
    initialPosition: { x: number; y: number },
    objectWidth: number = 100, // Ширина объекта по умолчанию
    objectHeight: number = 100 // Высота объекта по умолчанию
) {
    const [position, setPosition] = useState<{ x: number; y: number }>(initialPosition);
    const [initialMousePosition, setInitialMousePosition] = useState<{ x: number; y: number } | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (isDragging && initialMousePosition && offset) {
                const newX = event.clientX - offset.x;
                const newY = event.clientY - offset.y;

                if (
                    newX >= 0 && newX <= slideWidth - objectWidth &&
                    newY >= 0 && newY <= slideHeight - objectHeight
                ) {
                    setPosition({ x: newX, y: newY });
                }
            }
        };

        const handleMouseUp = () => {
            if (isDragging) {
                onDragEnd(position);
                setIsDragging(false);
                setInitialMousePosition(null);
                setOffset(null);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, initialMousePosition, position, onDragEnd, slideWidth, slideHeight, offset]);

    const onMouseDown = (event: React.MouseEvent) => {
        event.preventDefault();
        setInitialMousePosition({ x: event.clientX, y: event.clientY });
        setOffset({ x: event.clientX - position.x, y: event.clientY - position.y });
        setIsDragging(true);
    };

    return { position, onMouseDown };
}

export { useDragAndDropObject };