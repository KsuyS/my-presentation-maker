import { EditorType } from "./EditorType.ts";
import { Slide } from "./PresentationType.ts"

function addSlide(editor: EditorType): EditorType {
    const newSlide: Slide = {
        id: generateRandomId(6),
        content: [],
        background: { type: 'solid', color: '#ffffff' },
    };

    const selectedSlideIndex = editor.presentation.slides.findIndex(slide => slide.id == editor.selection.selectedSlideId);

    return {
        presentation: {
            ...editor.presentation,
            slides: [
                ...editor.presentation.slides.slice(0, selectedSlideIndex + 1),
                newSlide,
                ...editor.presentation.slides.slice(selectedSlideIndex + 1)
            ]
        },
        selection: editor.selection
    };
}

function generateRandomId(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}

export {
    addSlide,
}

