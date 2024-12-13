import { uuidV4 } from "../../utils/uuidV4";
import { Slide } from "../PresentationType";

function createNewSlide(): Slide {
    return {
        id: uuidV4(),
        content: [],
        background: { type: 'solid', color: '#ffffff' },
    }
}

export {
    createNewSlide,
}