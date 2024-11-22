import { EditorType } from "./EditorType.ts";
import { Slide } from "./PresentationType.ts";

function changeSlidePosition(editor: EditorType, updatedSlides: Array<Slide>): EditorType {
    const { presentation, selection } = editor;

    if (!selection || !selection.selectedSlideId) {
        return editor;
    }

    const slideId = selection.selectedSlideId;

    return {
        ...editor,
        presentation: {
            ...presentation,
            slides: updatedSlides,
        },
        selection: {
            ...selection,
            selectedSlideId: slideId,
        },
    };
}

export { changeSlidePosition };