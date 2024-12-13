import { EditorType } from "../EditorType";
import { SlideObject } from "../PresentationType";

function resizeObject(
    currentEditor: EditorType,
    slideId: string,
    elementId: string,
    newWidth: number,
    newHeight: number,
    newX: number,
    newY: number
): EditorType {
    const slide = currentEditor.presentation.slides.find(s => s.id === slideId);

    if (!slide) return currentEditor;
    const content = slide.content.find(el => el.id === elementId);
    if (!content) return currentEditor;

    const updatedElement: SlideObject = {
        ...content,
        position: { x: newX, y: newY },
        size: {
            width: newWidth,
            height: newHeight,
        }
    };

    const updatedElements = slide.content.map(el => el.id === elementId ? updatedElement : el);
    const updatedSlide = {
        ...slide,
        content: updatedElements,
    };

    return {
        ...currentEditor,
        presentation: {
            ...currentEditor.presentation,
            slides: currentEditor.presentation.slides.map(s => s.id === slideId ? updatedSlide : s),
        },
    };
}

export {resizeObject}