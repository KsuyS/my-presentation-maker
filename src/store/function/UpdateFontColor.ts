import { EditorType } from '../EditorType';

const updateFontColor = (
    editor: EditorType,
    slideId: string,
    objectId: string,
    newFontColor: string
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
                                    fontColor: newFontColor,
                                }
                                : object
                        ),
                    }
                    : slide
            ),
        },
    };
};

export { updateFontColor }