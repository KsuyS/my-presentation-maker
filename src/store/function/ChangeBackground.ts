import { EditorType } from "../EditorType";
import { SolidBackground, ImageBackground, GradientBackground, Background } from "../PresentationType";

interface ChangeBackgroundOptions {
    type: 'solid' | 'image' | 'gradient';
    value: string;
}

function changeBackground(editor: EditorType, options: ChangeBackgroundOptions): EditorType {
    let newBackground: Background;

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
    } else if (options.type === 'gradient') {
        newBackground = {
            type: 'gradient',
            gradient: options.value,
        } as GradientBackground;
    }
    else {
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