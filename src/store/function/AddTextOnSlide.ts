import { EditorType } from "../EditorType";
import { TextContent } from "../PresentationType"
import { generateRandomId } from "./GenerateRandomId";

function addText(editor: EditorType): EditorType {
    const newText = "Введите текст";
    if (!editor.selection || !editor.selection.selectedSlideId) {
        return editor;
    }

    const newTextObject: TextContent = {
        id: generateRandomId(6),
        position: { x: 0, y: 0 },
        size: { width: 100, height: 50 },
        type: 'text',
        value: newText,
        fontFamily: 'Times New Roman',
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

export {
    addText,
}
