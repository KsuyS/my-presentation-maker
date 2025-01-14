import { EditorType } from '../EditorType';

function updateFontStyle(
    editor: EditorType,
    slideId: string,
    objectId: string,
    fontStyle: 'normal' | 'italic'
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
                                ? { ...obj, fontStyle }
                                : obj
                        ),
                    }
                    : slide
            ),
        },
    };
}

export { updateFontStyle }