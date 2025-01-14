import { EditorType } from '../EditorType';
import { addSlide } from '../function/AddSlide';
import { setSelection } from '../SetSelection';
import { ActionType, EditorAction } from './actions';
import { data } from '../data'
import { removeSlide } from '../function/RemoveSlide';
import { addText } from '../function/AddTextOnSlide';
import { addImage } from '../function/AddImageOnSlide';
import { removeObject } from '../function/RemoveObjectOnSlide';
import { changeBackground } from '../function/ChangeBackground';
import { renamePresentationTitle } from '../function/RenamePresentationTitle';
import { changeSlidePosition } from '../function/ChangeSlidePosition';
import { changeObjectPosition } from '../function/ChangeObjectPosition';
import { changeObjectSize } from '../function/ChangeObjectSize';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/storage';
import { updateTextContent } from '../function/UpdateTextContent';
import { updateFontSize } from '../function/UpdateFontSize';
import { updateFontFamily } from '../function/UpdateFontFamily';
import { updateFontColor } from '../function/UpdateFontColor';
import { updateTextAlign } from '../function/UpdateTextAlign';
import { updateFontWeight } from '../function/UpdateFontWeight';
import { updateFontStyle } from '../function/UpdateFontStyle';
import { updateTextDecoration } from '../function/UpdateTextDecoration';
import { updateTextCase } from '../function/UpdateTextCase';
import { updateImageBorderStyle } from '../function/UpdateImageBorderStyle';

const initialState: EditorType = loadFromLocalStorage() || data;

function editorReducer(editor: EditorType = initialState, action: EditorAction): EditorType {
    let newState: EditorType;

    switch (action.type) {
        case ActionType.ADD_SLIDE:
            newState = addSlide(editor);
            break;
        case ActionType.REMOVE_SLIDE:
            newState = removeSlide(editor);
            break;
        case ActionType.SET_SELECTION:
            newState = setSelection(editor, action);
            break;
        case ActionType.SET_EDITOR:
            newState = action.payload;
            break;
        case ActionType.ADD_TEXT:
            newState = addText(editor);
            break;
        case ActionType.ADD_IMAGE:
            newState = addImage(editor, action.payload);
            break;
        case ActionType.REMOVE_OBJECT:
            newState = removeObject(editor);
            break;
        case ActionType.CHANGE_BACKGROUND:
            newState = changeBackground(editor, action.payload);
            break;
        case ActionType.IMPORT_FROM_JSON:
            newState = action.payload;
            break;
        case ActionType.EXPORT_TO_JSON:
            return editor;
        case ActionType.RENAME_PRESENTATION:
            newState = renamePresentationTitle(editor, action.payload);
            break;
        case ActionType.CHANGE_SLIDE_POSITION:
            newState = changeSlidePosition(editor, action.payload.slideIds, action.payload.targetSlideId);
            break;
        case ActionType.CHANGE_POSITION_OBJECT:
            newState = changeObjectPosition(
                editor,
                action.payload.slideId,
                action.payload.objectId,
                action.payload.x,
                action.payload.y
            );
            break;
        case ActionType.CHANGE_OBJECT_SIZE:
            newState = changeObjectSize(
                editor,
                action.payload.slideId,
                action.payload.objectId,
                action.payload.width,
                action.payload.height,
                action.payload.x,
                action.payload.y
            );
            break;
        case ActionType.UPDATE_TEXT_CONTENT:
            newState = updateTextContent(
                editor,
                action.payload.slideId,
                action.payload.objectId,
                action.payload.value);
            break;
        case ActionType.UPDATE_FONT_SIZE:
            newState = updateFontSize(
                editor,
                action.payload.slideId,
                action.payload.objectId,
                action.payload.fontSize);
            break;
        case ActionType.UPDATE_FONT_FAMILY:
            newState = updateFontFamily(
                editor,
                action.payload.slideId,
                action.payload.objectId,
                action.payload.fontFamily);
            break;
        case ActionType.UPDATE_FONT_COLOR:
            newState = updateFontColor(
                editor,
                action.payload.slideId,
                action.payload.objectId,
                action.payload.fontColor);
            break;
        case ActionType.UPDATE_TEXT_ALIGN:
            newState = updateTextAlign(
                editor,
                action.payload.slideId,
                action.payload.objectId,
                action.payload.textAlign
            );
            break;
        case ActionType.UPDATE_FONT_WEIGHT:
            newState = updateFontWeight(
                editor,
                action.payload.slideId,
                action.payload.objectId,
                action.payload.fontWeight
            );
            break;
        case ActionType.UPDATE_FONT_STYLE:
            newState = updateFontStyle(
                editor,
                action.payload.slideId,
                action.payload.objectId,
                action.payload.fontStyle
            );
            break;

        case ActionType.UPDATE_TEXT_DECORATION:
            newState = updateTextDecoration(
                editor,
                action.payload.slideId,
                action.payload.objectId,
                action.payload.textDecoration
            );
            break;

        case ActionType.UPDATE_TEXT_CASE:
            newState = updateTextCase(
                editor,
                action.payload.slideId,
                action.payload.objectId,
                action.payload.textCase
            );
            break;
        case ActionType.UPDATE_IMAGE_BORDER_STYLE:
            newState = updateImageBorderStyle(
                editor,
                action.payload.slideId,
                action.payload.objectId,
                action.payload.borderStyle
            );
            break;
        case ActionType.FETCH_UNSPLASH_IMAGES_REQUEST:
            return {
                ...editor,
                unsplash: {
                    ...editor.unsplash,
                    images: {
                        ...editor.unsplash.images,
                        loading: true,
                        error: null
                    }
                }
            };

        case ActionType.FETCH_UNSPLASH_IMAGES_SUCCESS:
            return {
                ...editor,
                unsplash: {
                    ...editor.unsplash,
                    images: {
                        data: action.payload,
                        loading: false,
                        error: null
                    }
                }
            };

        case ActionType.FETCH_UNSPLASH_IMAGES_FAILURE:
            return {
                ...editor,
                unsplash: {
                    ...editor.unsplash,
                    images: {
                        ...editor.unsplash.images,
                        loading: false,
                        error: action.payload
                    }
                }
            };

        case ActionType.FETCH_UNSPLASH_BACKGROUNDS_REQUEST:
            return {
                ...editor,
                unsplash: {
                    ...editor.unsplash,
                    backgrounds: {
                        ...editor.unsplash.backgrounds,
                        loading: true,
                        error: null
                    }
                }
            };

        case ActionType.FETCH_UNSPLASH_BACKGROUNDS_SUCCESS:
            return {
                ...editor,
                unsplash: {
                    ...editor.unsplash,
                    backgrounds: {
                        data: action.payload,
                        loading: false,
                        error: null
                    }
                }
            };

        case ActionType.FETCH_UNSPLASH_BACKGROUNDS_FAILURE:
            return {
                ...editor,
                unsplash: {
                    ...editor.unsplash,
                    backgrounds: {
                        ...editor.unsplash.backgrounds,
                        loading: false,
                        error: action.payload
                    }
                }
            };

        default:
            return editor;
    }

    saveToLocalStorage(newState);
    return newState;
}

export {
    editorReducer,
}