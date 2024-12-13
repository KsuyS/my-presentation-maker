import { EditorType } from "../EditorType";

function removeObject(editor: EditorType): EditorType {
    if (!editor.selection) {
        return editor;
    }

    const selectedSlideId = editor.selection.selectedSlideId;
    const removeObjectId = editor.selection.selectedObjectId;

    const targetSlide = editor.presentation.slides.find(slide => slide.id === selectedSlideId);

    if (!targetSlide) {
        return editor;
    }

    const newContent = targetSlide.content.filter(content => content.id !== removeObjectId);
    let newSelectedObjectId = null;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide =>
                slide.id === selectedSlideId ? {
                    ...slide,
                    content: newContent,
                } : slide
            ),
        },
        selection: {
            selectedSlideId: selectedSlideId,
            selectedObjectId: newSelectedObjectId,
        },
    };
}

export {
    removeObject,
};
