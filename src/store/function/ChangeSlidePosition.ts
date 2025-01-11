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
    const newSlides = editor.presentation.slides.filter(slide => !slideIds.includes(slide.id));

    let insertionIndex = targetIndex;
    for (const slideToMove of slidesToMove) {
        const originalIndex = editor.presentation.slides.findIndex(slide => slide.id === slideToMove.id);
        if (originalIndex < targetIndex) {
            insertionIndex--;
        }
    }

    newSlides.splice(insertionIndex, 0, ...slidesToMove);

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        },
        selection: {
            ...editor.selection,
            selectedSlideIds: slideIds
        }
    };
}

export {
    changeSlidePosition
}
