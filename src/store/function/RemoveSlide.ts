import { EditorType } from '../EditorType';

function removeSlide(editor: EditorType): EditorType {
    const selectedSlideIds = editor.selection.selectedSlideIds;
    const slides = editor.presentation.slides;

    if (!selectedSlideIds || selectedSlideIds.length === 0) {
        return editor;
    }

    const newSlides = slides.filter(slide => !selectedSlideIds.includes(slide.id));

    const firstSelectedSlideIndex = slides.findIndex(slide => slide.id === selectedSlideIds[0]);

    let newSelectedSlideId: string | null = null;
    if (newSlides.length > 0) {
        if (firstSelectedSlideIndex !== -1) {
            if (firstSelectedSlideIndex < newSlides.length) {
                newSelectedSlideId = newSlides[firstSelectedSlideIndex].id;
            }
            else if (firstSelectedSlideIndex > 0) {
                newSelectedSlideId = newSlides[firstSelectedSlideIndex - 1].id;
            }
        }
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: {
            ...editor.selection,
            selectedSlideIds: newSelectedSlideId ? [newSelectedSlideId] : []
        }
    };
}

export {
    removeSlide,
}