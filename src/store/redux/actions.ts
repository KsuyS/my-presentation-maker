import { EditorType, SelectionType } from '../EditorType'

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
    UPDATE_TEXT_ALIGN = 'updateTextAlign',
    UPDATE_FONT_WEIGHT = 'updateFontWeight',
    UPDATE_FONT_STYLE = 'updateFontStyle',
    UPDATE_TEXT_DECORATION = 'updateTextDecoration',
    UPDATE_TEXT_CASE = 'updateTextCase',
    FETCH_UNSPLASH_IMAGES_REQUEST = 'fetchUnsplashImagesRequest',
    FETCH_UNSPLASH_IMAGES_SUCCESS = 'fetchUnsplashImagesSuccess',
    FETCH_UNSPLASH_IMAGES_FAILURE = 'fetchUnsplashImagesFailure',
    FETCH_UNSPLASH_BACKGROUNDS_REQUEST = 'fetchUnsplashBackgroundsRequest',
    FETCH_UNSPLASH_BACKGROUNDS_SUCCESS = 'fetchUnsplashBackgroundsSuccess',
    FETCH_UNSPLASH_BACKGROUNDS_FAILURE = 'fetchUnsplashBackgroundsFailure',
}

type FetchUnsplashImagesRequestAction = {
    type: ActionType.FETCH_UNSPLASH_IMAGES_REQUEST,
    payload: string,
}

type FetchUnsplashImagesSuccessAction = {
    type: ActionType.FETCH_UNSPLASH_IMAGES_SUCCESS,
    payload: string[],
}

type FetchUnsplashImagesFailureAction = {
    type: ActionType.FETCH_UNSPLASH_IMAGES_FAILURE,
    payload: string,
}

type FetchUnsplashImagesBackgroundRequestAction = {
    type: ActionType.FETCH_UNSPLASH_BACKGROUNDS_REQUEST,
    payload: string,
}

type FetchUnsplashImagesBackgroundSuccessAction = {
    type: ActionType.FETCH_UNSPLASH_BACKGROUNDS_SUCCESS,
    payload: string[],
}

type FetchUnsplashImagesBackgroundFailureAction = {
    type: ActionType.FETCH_UNSPLASH_BACKGROUNDS_FAILURE,
    payload: string,
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
        type: 'solid' | 'image' | 'gradient',
        value: string,
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
    type: ActionType.CHANGE_SLIDE_POSITION,
    payload: {
        slideIds: string[],
        targetSlideId: string,
    };
}

type ChangeObjectPositionAction = {
    type: ActionType.CHANGE_POSITION_OBJECT,
    payload: {
        slideId: string,
        objectId: string,
        x: number,
        y: number,
    };
}

type ChangeObjectSizeAction = {
    type: ActionType.CHANGE_OBJECT_SIZE,
    payload: {
        slideId: string,
        objectId: string,
        width: number,
        height: number,
        x: number,
        y: number,
    };
}

type UpdateTextContentAction = {
    type: ActionType.UPDATE_TEXT_CONTENT,
    payload: {
        slideId: string,
        objectId: string,
        value: string,
    };
};

type UpdateFontSizeAction = {
    type: ActionType.UPDATE_FONT_SIZE,
    payload: {
        slideId: string,
        objectId: string,
        fontSize: number,
    };
};

type UpdateFontFamilyAction = {
    type: ActionType.UPDATE_FONT_FAMILY,
    payload: {
        slideId: string,
        objectId: string,
        fontFamily: string,
    };
};

type UpdateFontColorAction = {
    type: ActionType.UPDATE_FONT_COLOR,
    payload: {
        slideId: string,
        objectId: string,
        fontColor: string,
    };
};

type UpdateTextAlignAction = {
    type: ActionType.UPDATE_TEXT_ALIGN,
    payload: {
        slideId: string,
        objectId: string,
        textAlign: 'left' | 'center' | 'right',
    };
};

type UpdateFontWeightAction = {
    type: ActionType.UPDATE_FONT_WEIGHT,
    payload: {
        slideId: string,
        objectId: string,
        fontWeight: 'normal' | 'bold',
    };
};

type UpdateFontStyleAction = {
    type: ActionType.UPDATE_FONT_STYLE,
    payload: {
        slideId: string,
        objectId: string,
        fontStyle: 'normal' | 'italic',
    };
};

type UpdateTextDecorationAction = {
    type: ActionType.UPDATE_TEXT_DECORATION,
    payload: {
        slideId: string,
        objectId: string,
        textDecoration: 'none' | 'underline',
    };
};

type UpdateTextCaseAction = {
    type: ActionType.UPDATE_TEXT_CASE,
    payload: {
        slideId: string,
        objectId: string,
        textCase: 'capitalize' | 'uppercase' | 'lowercase',
    };
};

type EditorAction = AddSlideAction | RemoveSlideAction | SetSelectionAction | SetEditorAction | AddTextAction | AddImageAction |
    RemoveObjectAction | ChangeBackgroundAction | ImportFromJsonAction | ExportToJsonAction | RenamePresentationTitleAction |
    ChangeSlidePositionAction | ChangeObjectPositionAction | ChangeObjectSizeAction | UpdateTextContentAction | UpdateFontSizeAction |
    UpdateFontFamilyAction | UpdateFontColorAction | FetchUnsplashImagesRequestAction | FetchUnsplashImagesSuccessAction |
    FetchUnsplashImagesFailureAction | FetchUnsplashImagesBackgroundRequestAction | FetchUnsplashImagesBackgroundSuccessAction |
    FetchUnsplashImagesBackgroundFailureAction | UpdateTextAlignAction | UpdateFontWeightAction | UpdateFontStyleAction |
    UpdateTextDecorationAction | UpdateTextCaseAction

export {
    ActionType,
    type SetSelectionAction,
    type EditorAction,
}