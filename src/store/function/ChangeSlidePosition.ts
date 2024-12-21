import { EditorType } from "../EditorType";

function changeSlidePosition(editor: EditorType, draggedSlideId: string, targetSlideId: string): EditorType {
    const { presentation, selection } = editor;
    const { slides } = presentation;

    const draggedIndex = slides.findIndex(slide => slide.id === draggedSlideId);
    const targetIndex = slides.findIndex(slide => slide.id === targetSlideId);

    if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) {
        return editor;
    }

    const newSlides = [...slides];
    const [draggedSlide] = newSlides.splice(draggedIndex, 1);
    newSlides.splice(targetIndex, 0, draggedSlide);

    return {
        ...editor,
        presentation: {
            ...presentation,
            slides: newSlides,
        },
        selection: selection
    };
}

export { changeSlidePosition };