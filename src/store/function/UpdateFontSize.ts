import { EditorType } from '../EditorType';

const updateFontSize = (
    editor: EditorType,
    slideId: string,
    objectId: string,
    newFontSize: number
): EditorType => {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map((slide) =>
                slide.id === slideId
                    ? {
                        ...slide,
                        content: slide.content.map((object) =>
                            object.id === objectId && object.type === "text"
                                ? {
                                    ...object,
                                    fontSize: newFontSize,
                                }
                                : object
                        ),
                    }
                    : slide
            ),
        },
    };
};

export { updateFontSize };