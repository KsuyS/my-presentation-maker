import { EditorType } from "./EditorType.ts"; 

function removeSlide(editor: EditorType): EditorType { 
    if (!editor.selection) { 
        return editor; 
    } 

    const removeSlideId = editor.selection.selectedSlideId;
    const removeSlideIndex = editor.presentation.slides.findIndex(slide => slide.id === removeSlideId);

    const newSlides = editor.presentation.slides.filter(slide => slide.id !== removeSlideId); 

    let newSelectedSlideId = null;
    if (newSlides.length > 0) { 
        if (removeSlideIndex < newSlides.length) {
            newSelectedSlideId = newSlides[removeSlideIndex].id;
        } else {
            newSelectedSlideId = newSlides[Math.max(removeSlideIndex - 1, 0)].id;
        }
    } 

    return { 
        ...editor,
        presentation: { 
            ...editor.presentation, 
            slides: newSlides,
        }, 
        selection: { 
            selectedSlideId: newSelectedSlideId,
            selectedObjectId: editor.selection.selectedObjectId
        }, 
    }; 
}

export { 
    removeSlide, 
};