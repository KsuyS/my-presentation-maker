import { EditorType } from "./EditorType.ts";
import { ImageContent } from "./PresentationType.ts";

function addImage(editor: EditorType): EditorType {
    const image = "cat.png";
    if (!editor.selection || !editor.selection.selectedSlideId) {
        return editor;
    }

    const newImageObject: ImageContent = {
        id: generateRandomId(6),
        position: { x: 400, y: 300 },
        size: { width: 200, height: 150 },
        type: 'image',
        src: image,
    };

    const updatedSlides = editor.presentation.slides.map(slide => {
        if (slide.id === editor.selection.selectedSlideId) {
            return {
                ...slide,
                content: [...slide.content, newImageObject],
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

export { addImage };
