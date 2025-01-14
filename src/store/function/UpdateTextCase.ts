import { EditorType } from '../EditorType';

function updateTextCase(
    editor: EditorType,
    slideId: string,
    objectId: string,
    textCase: 'capitalize' | 'uppercase' | 'lowercase'
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
                                ? { ...obj, textCase }
                                : obj
                        ),
                    }
                    : slide
            ),
        },
    };
}

export { updateTextCase }