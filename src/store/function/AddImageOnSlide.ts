import { EditorType } from "../EditorType";
import { ImageContent } from "../PresentationType";
import { generateRandomId } from "./GenerateRandomId";

function addImage(editor: EditorType, { src }: { src: string }): EditorType {
    if (!editor.selection || editor.selection.selectedSlideIds.length === 0) {
        return editor;
    }
    const newImageObject: ImageContent = {
        id: generateRandomId(6),
        position: { x: 400, y: 300 },
        size: { width: 200, height: 150 },
        type: 'image',
        src,
    };

    const updatedSlides = editor.presentation.slides.map(slide => {
        if (editor.selection.selectedSlideIds.includes(slide.id)) {
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

export { addImage };