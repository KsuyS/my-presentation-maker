import { useState } from "react";

export function useDragAndDrop(slides: Array<{ id: string }>, onSlidesChange: (updatedSlides: Array<{ id: string }>) => void) {
    const [draggedSlideId, setDraggedSlideId] = useState<string | null>(null);

    function onDragStart(event: React.DragEvent<HTMLDivElement>, slideId: string) {
        setDraggedSlideId(slideId);
        event.dataTransfer.effectAllowed = "move";
    }

    function onDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

    function onDrop(event: React.DragEvent<HTMLDivElement>, targetSlideId: string) {
        event.preventDefault();

        if (draggedSlideId && draggedSlideId !== targetSlideId) {
            const draggedIndex = slides.findIndex(slide => slide.id === draggedSlideId);
            const targetIndex = slides.findIndex(slide => slide.id === targetSlideId);

            if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) return;

            const updatedSlides = [...slides];
            const [movedSlide] = updatedSlides.splice(draggedIndex, 1);
            updatedSlides.splice(targetIndex, 0, movedSlide);

            onSlidesChange(updatedSlides);
        }

        setDraggedSlideId(null);
    }

    function onDragEnd() {
        setDraggedSlideId(null);
    }

    return { onDragStart, onDragOver, onDrop, onDragEnd };
}