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
            if (selection && slide.id === selection.selectedSlideId) {
                slides.push(newSlide);
            }
        }
        if (!selection || !slides.some(slide => slide.id === selection.selectedSlideId)) {
            slides.push(newSlide);
        }
    }

    return {
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
        selection: {
            selectedSlideId: newSlide.id,
            selectedObjectId: null
        }
    };
}

export {
    addSlide,
}
