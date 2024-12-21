import { EditorType } from "../EditorType";

function changeObjectPosition(editor: EditorType, slideId: string, objectId: string, newX: number, newY: number): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide =>
                slide.id === slideId
                    ? {
                        ...slide,
                        content: slide.content.map(content =>
                            content.id === objectId
                                ? { ...content, position: { x: newX, y: newY } }
                                : content
                        ),
                    }
                    : slide
            ),
        },
    };
}

export { changeObjectPosition };