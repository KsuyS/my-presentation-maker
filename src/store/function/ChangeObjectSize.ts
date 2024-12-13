import { EditorType } from "../EditorType";
import { Slide, SlideObject, TextContent, ImageContent } from "../PresentationType";

function ChangeObjectSize(editor: EditorType, newSize: { width: number; height: number }): EditorType {
    console.log('newSize: ', newSize);

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
                    if (object.type === 'text') {
                        return {
                            ...object,
                            size: newSize,
                        } as TextContent;
                    } else if (object.type === 'image') {
                        return {
                            ...object,
                            size: newSize,
                        } as ImageContent;
                    }
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

export { ChangeObjectSize };