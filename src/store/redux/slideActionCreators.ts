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
    type: ActionType.IMPORT_FROM_JSON,
    payload,
});

const exportToJson = (payload: EditorType) => ({
    type: ActionType.EXPORT_TO_JSON,
    payload,
});

const renamePresentationTitle = (payload: string) => ({
    type: ActionType.RENAME_PRESENTATION,
    payload,
});

const changeSlidePosition = (editor: EditorType, slideId: string, targetSlideId: string) => ({
    type: ActionType.CHANGE_SLIDE_POSITION,
    payload: {
        editor,
        slideId,
        targetSlideId,
    },
});

const changeObjectPosition = (editor: EditorType, slideId: string, objectId: string, newX: number, newY: number) => ({
    type: ActionType.CHANGE_POSITION_OBJECT,
    payload: {
        editor,
        slideId,
        objectId,
        x: newX,
        y: newY,
    },
});

const changeObjectSize = (
    editor: EditorType, slideId: string, objectId: string, newWidth: number, newHeight: number, newX: number, newY: number,
) => ({
    type: ActionType.CHANGE_OBJECT_SIZE,
    payload: {
        editor,
        slideId,
        objectId,
        width: newWidth,
        height: newHeight,
        x: newX,
        y: newY,
    },
});

const updateTextContent = (slideId: string, objectId: string, value: string

) => ({
    type: ActionType.UPDATE_TEXT_CONTENT,
    payload: {
        slideId, 
        objectId, 
        value },
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
    renamePresentationTitle,
    changeSlidePosition,
    changeObjectPosition,
    changeObjectSize,
    updateTextContent
}