import { EditorType } from '../EditorType';

function updateTextDecoration(
    editor: EditorType,
    slideId: string,
    objectId: string,
    textDecoration: 'none' | 'underline'
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
                                ? { ...obj, textDecoration }
                                : obj
                        ),
                    }
                    : slide
            ),
        },
    };
}

export { updateTextDecoration }