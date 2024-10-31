import { EditorType } from "./EditorType.ts";
import { TextContent } from "./PresentationType.ts"


function addText(editor: EditorType): EditorType {
    const newText = "Введите текст";
    if (!editor.selection || !editor.selection.selectedSlideId) {
        return editor;
    }

    const newTextObject: TextContent = {
        id: generateRandomId(6),
        position: { x: 300, y: 400 },
        size: { width: 100, height: 50 },
        type: 'text',
        value: newText,
        fontFamily: 'Arial',
        fontSize: 16,
        fontColor: '#000000',
    };

    const updatedSlides = editor.presentation.slides.map(slide => {
        if (slide.id === editor.selection.selectedSlideId) {
            return {
                ...slide,
                content: [...slide.content, newTextObject],
            };
        }
        return slide;
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
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
    addText,
}
