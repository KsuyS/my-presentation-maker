import { EditorType } from "../EditorType";
import { addSlide } from "../function/AddSlide";
import { setSelection } from "../SetSelection";
import { ActionType, EditorAction } from "./actions";
import { data } from "../data"
import { removeSlide } from "../function/RemoveSlide";
import { addText } from "../function/AddTextOnSlide";
import { addImage } from "../function/AddImageOnSlide";
import { removeObject } from "../function/RemoveObjectOnSlide";
import { changeBackground } from "../function/ChangeBackground";

function editorReducer(editor: EditorType = data, action: EditorAction): EditorType {
    switch (action.type) {
        case ActionType.ADD_SLIDE:
            return addSlide(editor)
        case ActionType.REMOVE_SLIDE:
            return removeSlide(editor)
        case ActionType.SET_SELECTION:
            return setSelection(editor, action)
        case ActionType.SET_EDITOR:
            return action.payload
        case ActionType.ADD_TEXT:
            return addText(editor)
        case ActionType.ADD_IMAGE:
            return addImage(editor, action.payload)
        case ActionType.REMOVE_OBJECT:
            return removeObject(editor)
        case ActionType.CHANGE_BACKGROUND:
            return changeBackground(editor, action.payload)
        case ActionType.IMPORTFROMJSON:
            return { ...action.payload };
        case ActionType.EXPORTTOJSON:
            return { ...action.payload };
        default:
            return editor
    }
}

export {
    editorReducer,
}