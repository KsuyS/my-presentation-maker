import { EditorType } from '../EditorType';
import { createNewSlide } from './createNewSlide';

const slide = createNewSlide()
const defaultEditor: EditorType = {
    presentation: {
        title: 'Название презентации',
        slides: [
            slide,
        ],
    },
    selection: {
        selectedSlideIds: [slide.id],
        selectedObjectId: null,
    },
    unsplash: {
        images: {
            data: [],
            loading: false,
            error: null
        },
        backgrounds: {
            data: [],
            loading: false,
            error: null
        }
    }
}

export {
    defaultEditor,
}