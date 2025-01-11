import { EditorType, SelectionType } from "../EditorType"

enum ActionType {
    RENAME_PRESENTATION = 'renamePresentation',
    ADD_SLIDE = 'addSlide',
    REMOVE_SLIDE = 'removeSlide',
    SET_SELECTION = 'setSelection',
    SET_EDITOR = 'setEditor',
    ADD_TEXT = 'addText',
    ADD_IMAGE = 'addImage',
    REMOVE_OBJECT = 'removeObject',
    CHANGE_BACKGROUND = 'changeBackground',
    IMPORT_FROM_JSON = 'importFromJson',
    EXPORT_TO_JSON = 'exportFromJson',
    CHANGE_SLIDE_POSITION = 'changeSlidePosition',
    CHANGE_POSITION_OBJECT = 'changeObjectPosition',
    CHANGE_OBJECT_SIZE = 'changeObjectSize',
    UPDATE_TEXT_CONTENT = 'updateTextContent',
    UPDATE_FONT_SIZE = 'updateFontSize',
    UPDATE_FONT_FAMILY = 'updateFontFamily',
    UPDATE_FONT_COLOR = 'updateFontColor',
}

type RenamePresentationTitleAction = {
    type: ActionType.RENAME_PRESENTATION,
    payload: string;
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
        type: 'solid' | 'image' | 'gradient';
        value: string;
    };
}

type ImportFromJsonAction = {
    type: ActionType.IMPORT_FROM_JSON,
    payload: EditorType;
}

type ExportToJsonAction = {
    type: ActionType.EXPORT_TO_JSON,
    payload: EditorType;
}

type ChangeSlidePositionAction = {
    type: ActionType.CHANGE_SLIDE_POSITION;
    payload: {
        slideId: string;
        targetSlideId: string;
    };
};

type ChangeObjectPositionAction = {
    type: ActionType.CHANGE_POSITION_OBJECT;
    payload: {
        slideId: string;
        objectId: string;
        x: number;
        y: number;
    };
}

type ChangeObjectSizeAction = {
    type: ActionType.CHANGE_OBJECT_SIZE;
    payload: {
        slideId: string;
        objectId: string;
        width: number;
        height: number;
        x: number;
        y: number;
    };
}

type UpdateTextContentAction = {
    type: ActionType.UPDATE_TEXT_CONTENT;
    payload: {
        slideId: string;
        objectId: string;
        value: string;
    };
};

type UpdateFontSizeAction = {
    type: ActionType.UPDATE_FONT_SIZE;
    payload: {
        slideId: string;
        objectId: string;
        fontSize: number;
    };
};

type UpdateFontFamilyAction = {
    type: ActionType.UPDATE_FONT_FAMILY;
    payload: {
        slideId: string;
        objectId: string;
        fontFamily: string;
    };
};

type UpdateFontColorAction = {
    type: ActionType.UPDATE_FONT_COLOR;
    payload: {
        slideId: string;
        objectId: string;
        fontColor: string;
    };
};


type EditorAction = AddSlideAction | RemoveSlideAction | SetSelectionAction | SetEditorAction | AddTextAction | AddImageAction |
    RemoveObjectAction | ChangeBackgroundAction | ImportFromJsonAction | ExportToJsonAction | RenamePresentationTitleAction |
    ChangeSlidePositionAction | ChangeObjectPositionAction | ChangeObjectSizeAction | UpdateTextContentAction | UpdateFontSizeAction
    | UpdateFontFamilyAction | UpdateFontColorAction

export {
    ActionType,
    type SetSelectionAction,
    type EditorAction,
}