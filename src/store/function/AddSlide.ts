import { EditorType } from "../EditorType";
import { Slide } from "../PresentationType";
import { createNewSlide } from "../redux/createNewSlide";

function addSlide(editor: EditorType): EditorType {
    const selection = editor.selection;
    const newSlide = createNewSlide();
    const slides: Slide[] = [];

    if (editor.presentation.slides.length === 0) {
        slides.push(newSlide);
    } else {
        for (const slide of editor.presentation.slides) {
            slides.push(slide);
            if (selection && selection.selectedSlideIds.includes(slide.id)) {
                slides.push(newSlide);
            }
        }
        if (!selection || selection.selectedSlideIds.length === 0) {
            slides.push(newSlide);
        }
    }

    return {
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
        selection: {
            selectedSlideIds: [newSlide.id],
            selectedObjectId: null
        }
    };
}

export {
    addSlide,
}