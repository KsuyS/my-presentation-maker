import { Slide } from '../PresentationType';
import { generateRandomId } from '../function/GenerateRandomId';

function createNewSlide(): Slide {
    return {
        id: generateRandomId(),
        content: [],
        background: { type: 'solid', color: '#ffffff' },
    }
}

export {
    createNewSlide,
}