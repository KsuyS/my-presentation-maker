import { EditorType } from '../EditorType';

function updateTextAlign(
    editor: EditorType,
    slideId: string,
    objectId: string,
    textAlign: 'left' | 'center' | 'right'
): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide =>
                slide.id === slideId
                    ? {
                        ...slide,
                        content: slide.content.map(obj =>
                            obj.id === objectId && obj.type === 'text'
                                ? { ...obj, textAlign }
                                : obj
                        ),
                    }
                    : slide
            ),
        },
    };
}

export { updateTextAlign }