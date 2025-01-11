import { EditorType } from "../EditorType";

function changeSlidePosition(editor: EditorType, slideIds: string[], targetSlideId: string): EditorType {
    if (!slideIds || slideIds.length === 0 || !targetSlideId) {
        return editor;
    }

    const targetIndex = editor.presentation.slides.findIndex(slide => slide.id === targetSlideId);
    if (targetIndex === -1) {
        return editor;
    }

    const slidesToMove = editor.presentation.slides.filter(slide => slideIds.includes(slide.id));
    let newSlides = editor.presentation.slides.filter(slide => !slideIds.includes(slide.id));

    // Determine the correct insertion index
    let insertionIndex = targetIndex;

    // Adjust insertion index based on the original positions of the slides being moved
    for (const slideToMove of slidesToMove) {
        const originalIndex = editor.presentation.slides.findIndex(slide => slide.id === slideToMove.id);
        if (originalIndex < targetIndex) {
            insertionIndex--; // Move up the insertion index for each slide that is before the target
        }
    }
    
    // Ensure insertion index is within bounds
    insertionIndex = Math.max(0, insertionIndex);
    insertionIndex = Math.min(newSlides.length, insertionIndex); // Prevent exceeding newSlides length

    // Create new slides array with moved slides inserted at the correct position
    newSlides = [
        ...newSlides.slice(0, insertionIndex),
        ...slidesToMove,
        ...newSlides.slice(insertionIndex),
    ];

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        },
        selection: {
            ...editor.selection,
            selectedSlideIds: [] // Clear selection after moving; adjust if you want to keep selection
        }
    };
}

export {
    changeSlidePosition
}
