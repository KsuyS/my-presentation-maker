import { EditorType } from '../EditorType';
import { BorderStyle } from '../PresentationType';

function updateImageBorderStyle(
    editor: EditorType,
    slideId: string,
    objectId: string,
    newBorderStyle: BorderStyle
): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide =>
                slide.id === slideId
                    ? {
                        ...slide,
                        content: slide.content.map(content =>
                            content.id === objectId && content.type === 'image'
                                ? { ...content, borderStyle: newBorderStyle }
                                : content
                        ),
                    }
                    : slide
            ),
        },
    };
}

export { updateImageBorderStyle };