import { EditorType } from '../EditorType';

function removeObject(editor: EditorType): EditorType {
    if (!editor.selection) {
        return editor;
    }

    const selectedSlideIds = editor.selection.selectedSlideIds;
    const removeObjectId = editor.selection.selectedObjectId;

    if (!selectedSlideIds || selectedSlideIds.length === 0 || !removeObjectId) {
        return editor;
    }

    const updatedSlides = editor.presentation.slides.map(slide => {
        if (selectedSlideIds.includes(slide.id)) {
            const newContent = slide.content.filter(content => content.id !== removeObjectId);
            return {
                ...slide,
                content: newContent,
            };
        }
        return slide;
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
        selection: {
            ...editor.selection,
            selectedObjectId: null, 
        },
    };
}

export {
    removeObject,
};