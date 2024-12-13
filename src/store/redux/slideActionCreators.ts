import { ActionType } from "./actions"
import { EditorType } from "../EditorType"

function addSlide() {
    return {
        type: ActionType.ADD_SLIDE,
    }
}

function removeSlide() {
    return {
        type: ActionType.REMOVE_SLIDE,
    }
}

function addText() {
    return {
        type: ActionType.ADD_TEXT,
    }
}

const addImage = (payload: { src: string }) => ({
    type: ActionType.ADD_IMAGE,
    payload,
});

function removeObject() {
    return {
        type: ActionType.REMOVE_OBJECT,
    }
}

const changeBackground = (payload: { type: 'solid' | 'image'; value: string }) => ({
    type: ActionType.CHANGE_BACKGROUND,
    payload,
});

const importFromJson = (payload: EditorType) => ({
    type: ActionType.IMPORTFROMJSON,
    payload,
});

const exportToJson = (payload: EditorType) => ({
    type: ActionType.EXPORTTOJSON,
    payload,
});

export {
    addSlide,
    removeSlide,
    addText,
    addImage,
    removeObject,
    changeBackground,
    importFromJson,
    exportToJson,
}