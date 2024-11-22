import { EditorType } from "./EditorType.ts";
import { Slide, SlideObject, ImageContent } from "./PresentationType.ts";

function ChangeObjectPosition(editor: EditorType, imageId: string, newPosition: { x: number; y: number }): EditorType {

            console.log('imageId: ', imageId)
            console.log('newPosition: ', newPosition) //приходит undefined

    const { presentation, selection } = editor;

    if (!selection || !selection.selectedSlideId) {
        return editor;
    }

    const slideId = selection.selectedSlideId;

    const updatedSlides = presentation.slides.map((slide: Slide) => {
        if (slide.id === slideId) {
            const updatedContent = slide.content.map((object: SlideObject) => {
                if (object.id === imageId && object.type === 'image') {
                    return {
                        ...object,
                        position: newPosition,
                    } as ImageContent;
                }
                return object;
            });

            return {
                ...slide,
                content: updatedContent,
            };
        }
        return slide;
    });

    return {
        ...editor,
        presentation: {
            ...presentation,
            slides: updatedSlides,
        },
        selection: {
            ...selection,
            selectedSlideId: slideId,
        },
    };
}

export { ChangeObjectPosition };