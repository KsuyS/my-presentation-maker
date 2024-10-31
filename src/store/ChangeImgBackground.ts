import { EditorType } from "./EditorType.ts";
import { ImageBackground } from "./PresentationType.ts"


function changeImgBackground(editor: EditorType): EditorType {

    const newBackground: ImageBackground = {
        type: 'image',
        src: './background.png',
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
    changeImgBackground,
}
