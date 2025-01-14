import { EditorType } from '../EditorType';

function updateFontWeight(
    editor: EditorType,
    slideId: string,
    objectId: string,
    fontWeight: 'normal' | 'bold'
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
                                ? { ...obj, fontWeight }
                                : obj
                        ),
                    }
                    : slide
            ),
        },
    };
}

export { updateFontWeight }