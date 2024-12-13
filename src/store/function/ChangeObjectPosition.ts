import { EditorType } from "../EditorType";
import { Slide, SlideObject, ImageContent, TextContent } from "../PresentationType";

function ChangeObjectPosition(editor: EditorType, newPosition: { x: number; y: number }): EditorType {
    console.log('newPosition: ', newPosition);

    const { presentation, selection } = editor;

    if (!selection || !selection.selectedSlideId || !selection.selectedObjectId) {
        return editor;
    }

    const slideId = selection.selectedSlideId;
    const objectId = selection.selectedObjectId;

    const updatedSlides = presentation.slides.map((slide: Slide) => {
        if (slide.id === slideId) {
            const updatedContent = slide.content.map((object: SlideObject) => {
                if (object.id === objectId) {
                    return {
                        ...object,
                        position: newPosition,
                    } as ImageContent | TextContent;
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