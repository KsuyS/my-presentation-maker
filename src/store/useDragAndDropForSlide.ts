import { useState } from 'react';

function useDragAndDropSlide<T>(initialItems: T[]) {
    const [items, setItems] = useState(initialItems);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        event.dataTransfer.setData("text/plain", index.toString());
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
        event.preventDefault();
        const draggedIndex = parseInt(event.dataTransfer.getData("text/plain"), 10);
        if (draggedIndex !== dropIndex) {
            const updatedItems = [...items];
            const [movedItem] = updatedItems.splice(draggedIndex, 1);
            updatedItems.splice(dropIndex, 0, movedItem);
            setItems(updatedItems);
        }
    };

    const handleDropping = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return { items, setItems, handleDragStart, handleDrop, handleDropping };
}

export { useDragAndDropSlide };