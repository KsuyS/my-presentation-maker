import { EditorType } from '../EditorType';

function updateTextContent(
    editor: EditorType,
    slideId: string,
    objectId: string,
    newValue: string
): EditorType {
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
                                  ? { ...object, value: newValue }
                                  : object
                          ),
                      }
                    : slide
            ),
        },
    };
}

export { updateTextContent };