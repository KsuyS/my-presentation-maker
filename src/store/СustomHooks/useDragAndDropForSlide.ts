import { useState } from 'react';
import { useAppActions } from '../Hooks/useAppActions';
import { useAppSelector } from '../Hooks/useAppSelector';

function useDragAndDropSlide() {
    const [draggingSlideIds, setDraggingSlideIds] = useState<string[] | null>(null);
    const [dragOverSlide, setDragOverSlide] = useState<string | null>(null);

    const { changeSlidePosition } = useAppActions();
    const editor = useAppSelector((state) => state);

    function handleDragStart(slideId: string) {
        const selectedSlideIds = editor.selection.selectedSlideIds;
        if (selectedSlideIds && selectedSlideIds.includes(slideId)) {
            setDraggingSlideIds(selectedSlideIds);
        } else {
            setDraggingSlideIds([slideId]);
        }
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>, slideId: string) {
        e.preventDefault();
        if (slideId !== dragOverSlide) {
            setDragOverSlide(slideId);
        }
    }

    function handleDragEnd(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        if (draggingSlideIds && dragOverSlide && !draggingSlideIds.includes(dragOverSlide)) { 
            changeSlidePosition(editor, draggingSlideIds, dragOverSlide);
        }
        setDraggingSlideIds(null);
        setDragOverSlide(null);
    }

    return {
        draggingSlideIds,
        dragOverSlide,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
    };
}

export { useDragAndDropSlide }