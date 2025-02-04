import { EditorType } from "./Editor/EditorType";
import { SolidBackground, ImageBackground } from "./Editor/PresentationType";

type BackgroundType = SolidBackground | ImageBackground;

interface ChangeBackgroundOptions {
    type: 'solid' | 'image';
    value: string;
}

function changeBackground(editor: EditorType, options: ChangeBackgroundOptions): EditorType {
    let newBackground: BackgroundType;

    if (options.type === 'solid') {
        newBackground = {
            type: 'solid',
            color: options.value,
        } as SolidBackground;
    } else if (options.type === 'image') {
        newBackground = {
            type: 'image',
            src: options.value,
        } as ImageBackground;
    } else {
        throw new Error("Invalid background type");
    }

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
    changeBackground,
}