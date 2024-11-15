import { EditorType } from "./EditorType.ts";
import { Slide } from "./PresentationType.ts"
import { generateRandomId } from "./generateRandomId.ts"

function addSlide(editor: EditorType): EditorType {
    const newSlide: Slide = {
        id: generateRandomId(6),
        content: [],
        background: { type: 'solid', color: '#ffffff' },
    };

    const selectedSlideIndex = editor.presentation.slides.findIndex(slide => slide.id === editor.selection.selectedSlideId);
    
    const updatedSlides = [
        ...editor.presentation.slides.slice(0, selectedSlideIndex + 1),
        newSlide,
        ...editor.presentation.slides.slice(selectedSlideIndex + 1)
    ];

    return {
        presentation: {
            ...editor.presentation,
            slides: updatedSlides
        },
        selection: {
            ...editor.selection,
            selectedSlideId: newSlide.id
        }
    };
}

export {
    addSlide,
}

