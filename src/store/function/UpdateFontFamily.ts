import { EditorType } from "../EditorType";

const updateFontFamily = (
    editor: EditorType,
    slideId: string,
    objectId: string,
    newFontFamily: string
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
                                    fontFamily: newFontFamily,
                                }
                                : object
                        ),
                    }
                    : slide
            ),
        },
    };
};

export { updateFontFamily }