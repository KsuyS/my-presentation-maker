import {EditorType, SelectionType} from "./EditorType";

function setSelection(editor: EditorType, newSelection: SelectionType): EditorType {
    return {
        ...editor,
        selection: newSelection,
    }
}

export {
    setSelection,
}
