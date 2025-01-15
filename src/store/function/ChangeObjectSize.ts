import { EditorType } from '../EditorType';
import { SlideObject } from '../PresentationType';

function changeObjectSize(
    currentEditor: EditorType,
    slideId: string,
    objectId: string,
    newWidth: number,
    newHeight: number,
    newX: number,
    newY: number
): EditorType {
    const slide = currentEditor.presentation.slides.find(s => s.id === slideId);

    if (!slide) return currentEditor;

    const content = slide.content.find(ob => ob.id === objectId);

    if (!content) return currentEditor;

    const updatedObject: SlideObject = {
        ...content,
        position:
        {
            x: newX,
            y: newY
        },
        size: {
            width: newWidth,
            height: newHeight,
        }
    };

    const updatedObjects = slide.content.map(ob => ob.id === objectId ? updatedObject : ob);
    const updatedSlide = {
        ...slide,
        content: updatedObjects,
    };

    return {
        ...currentEditor,
        presentation: {
            ...currentEditor.presentation,
            slides: currentEditor.presentation.slides.map(s => s.id === slideId ? updatedSlide : s),
        },
    };
}

export { changeObjectSize }