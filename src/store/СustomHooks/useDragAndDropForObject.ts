import { useState, useRef } from 'react';
import { dispatch } from '../editor';
import { EditorType } from '../EditorType';
import { MoveElementOnSlide } from '../function/MoveElementOnSlide';

type UseDragAndDropElementProps = {
    slideId: string;
};

function useDragAndDropObject({ slideId }: UseDragAndDropElementProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [draggedElementId, setDraggedElementId] = useState<string | null>(null);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const elementStartPos = useRef({ x: 0, y: 0 });

    function handleElementMouseDown(event: React.MouseEvent, elementId: string): void {
        event.preventDefault();
        setIsDragging(true);
        setDraggedElementId(elementId);
        dragStartPos.current = { x: event.clientX, y: event.clientY };

        dispatch((currentEditor: EditorType) => {
            const slide = currentEditor.presentation.slides.find(s => s.id === slideId);
            const element = slide?.content.find(e => e.id === elementId);
            if (element) {
                elementStartPos.current = { x: element.position.x, y: element.position.y };
            }
            return currentEditor;
        });
    }

    function handleElementMouseMove(event: React.MouseEvent): void {
        if (!isDragging || !draggedElementId) {
            return;
        }

        const deltaX = event.clientX - dragStartPos.current.x;
        const deltaY = event.clientY - dragStartPos.current.y;

        dispatch((currentEditor: EditorType) => {
            const slide = currentEditor.presentation.slides.find(s => s.id === slideId);
            if (!slide) return currentEditor;

            const element = slide.content.find(el => el.id === draggedElementId);
            if (!element) return currentEditor;

            const newX = Math.max(0, Math.min(elementStartPos.current.x + deltaX, 935 - element.size.width));
            const newY = Math.max(0, Math.min(elementStartPos.current.y + deltaY, 525 - element.size.height));

            return MoveElementOnSlide(currentEditor, slideId, draggedElementId, newX, newY);
        });
    }

    function handleElementMouseUp(): void {
        setIsDragging(false);
        setDraggedElementId(null);
    }

    return {
        isDragging,
        handleElementMouseDown,
        handleElementMouseMove,
        handleElementMouseUp,
    };
}

export { useDragAndDropObject };