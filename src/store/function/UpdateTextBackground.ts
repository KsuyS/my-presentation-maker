import { EditorType } from '../EditorType';

function updateTextBackground(editor: EditorType, slideId: string, objectId: string, backgroundColor: string): EditorType {
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
                                  ? { ...obj, backgroundColor }
                                  : obj
                          ),
                      }
                    : slide
            ),
        },
    };
}

export { updateTextBackground };