import { EditorType, SelectionType } from "../EditorType"

enum ActionType {
    ADD_SLIDE = 'addSlide',
    REMOVE_SLIDE = 'removeSlide',
    SET_SELECTION = 'setSelection',
    SET_EDITOR = 'setEditor',
    ADD_TEXT = 'addText',
    ADD_IMAGE = 'addImage',
    REMOVE_OBJECT = 'removeObject',
    CHANGE_BACKGROUND = 'changeBackground',
    IMPORTFROMJSON = 'importFromJson',
    EXPORTTOJSON = 'exportFromJson',
}

type AddSlideAction = {
    type: ActionType.ADD_SLIDE,
}

type RemoveSlideAction = {
    type: ActionType.REMOVE_SLIDE,
}

type SetSelectionAction = {
    type: ActionType.SET_SELECTION,
    payload: SelectionType,
}

type SetEditorAction = {
    type: ActionType.SET_EDITOR,
    payload: EditorType,
}

type AddTextAction = {
    type: ActionType.ADD_TEXT,
}

type AddImageAction = {
    type: ActionType.ADD_IMAGE,
    payload: { src: string };
}

type RemoveObjectAction = {
    type: ActionType.REMOVE_OBJECT,
}

type ChangeBackgroundAction = {
    type: ActionType.CHANGE_BACKGROUND,
    payload: { 
        type: 'solid' | 'image';
        value: string;
    };
}

type ImportFromJsonAction = {
    type: ActionType.IMPORTFROMJSON,
    payload: EditorType;
}

type ExportToJsonAction = {
    type: ActionType.EXPORTTOJSON,
    payload: EditorType;
}


type EditorAction = AddSlideAction | RemoveSlideAction | SetSelectionAction | SetEditorAction | AddTextAction | AddImageAction |
    RemoveObjectAction | ChangeBackgroundAction | ImportFromJsonAction | ExportToJsonAction

export {
    ActionType,
    type SetSelectionAction,
    type EditorAction,
}