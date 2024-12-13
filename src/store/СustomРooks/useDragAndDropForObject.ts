import { useState, useEffect, useRef } from 'react';

function useDragAndDropObject(
    onDragEnd: (newPosition: { x: number; y: number }) => void,
    slideWidth: number,
    slideHeight: number,
    initialPosition: { x: number; y: number },
    scale: number,
    objectWidth: number = 100,
    objectHeight: number = 100,
    isSelected: boolean,
) {
    const [position, setPosition] = useState<{ x: number; y: number }>(initialPosition);
    const aaaRef = useRef(initialPosition);
    
    if (JSON.stringify(initialPosition) !== JSON.stringify(aaaRef.current)) {
        aaaRef.current = initialPosition;
        setPosition({ ...initialPosition });
    }

    const [initialMousePosition, setInitialMousePosition] = useState<{ x: number; y: number } | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (isDragging && initialMousePosition && offset) {
                const newX = (event.clientX - offset.x) / scale;
                const newY = (event.clientY - offset.y) / scale;
        
                if (
                    newX >= 0 && newX <= slideWidth / scale - objectWidth &&
                    newY >= 0 && newY <= slideHeight / scale - objectHeight
                ) {
                    setPosition({ x: newX, y: newY });
                }
            }
        };

        const handleMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
                setInitialMousePosition(null);
                setOffset(null);
                
                onDragEnd(position);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, initialMousePosition, offset, position, onDragEnd, slideWidth, slideHeight, scale]);

    const onMouseDown = (event: React.MouseEvent) => {
        event.preventDefault();
        if (!isSelected) return;

        setInitialMousePosition({ x: event.clientX, y: event.clientY });
        setOffset({ 
            x: event.clientX - position.x * scale,
            y: event.clientY - position.y * scale,
        });
        setIsDragging(true);
    };

    return { position, onMouseDown };
}

export { useDragAndDropObject };