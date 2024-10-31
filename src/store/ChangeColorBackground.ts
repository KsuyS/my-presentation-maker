import { EditorType } from "./EditorType.ts";
import { SolidBackground } from "./PresentationType.ts"


function changeColorBackground(editor: EditorType): EditorType {

    const newBackground: SolidBackground = {
        type: 'solid',
        color: '#f0d8d5',
    };

    if (!editor.selection || !editor.selection.selectedSlideId) {
        return editor;
    }

    const updatedSlides = editor.presentation.slides.map(slide => {
        if (slide.id === editor.selection.selectedSlideId) {
            return {
                ...slide,
                background: newBackground,
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
    };

}


export {
    changeColorBackground,
}
