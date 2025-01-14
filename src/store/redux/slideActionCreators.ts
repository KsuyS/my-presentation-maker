import { ActionType } from './actions'
import { EditorType } from '../EditorType'
import { fetchUnsplashImages } from './unsplashMiddleWare'
import { fetchUnsplashBackgrounds } from './unsplashMiddleWare'

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

const changeBackground = (payload: { type: 'solid' | 'image' | 'gradient'; value: string }) => ({
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

const changeSlidePosition = (editor: EditorType, slideIds: string[], targetSlideId: string) => ({
    type: ActionType.CHANGE_SLIDE_POSITION,
    payload: {
        editor,
        slideIds,
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

const updateTextContent = (slideId: string, objectId: string, value: string) => ({
    type: ActionType.UPDATE_TEXT_CONTENT,
    payload: {
        slideId,
        objectId,
        value,
    },
});

const updateFontSize = (payload: { slideId: string; objectId: string; fontSize: number }) => ({
    type: ActionType.UPDATE_FONT_SIZE,
    payload,
});

const updateFontFamily = (payload: { slideId: string; objectId: string; fontFamily: string }) => ({
    type: ActionType.UPDATE_FONT_FAMILY,
    payload,
});

const updateFontColor = (payload: { slideId: string; objectId: string; fontColor: string }) => ({
    type: ActionType.UPDATE_FONT_COLOR,
    payload,
});

const updateTextAlign = (slideId: string, objectId: string, textAlign: 'left' | 'center' | 'right') => ({
    type: ActionType.UPDATE_TEXT_ALIGN,
    payload: {
        slideId,
        objectId,
        textAlign
    }
});

const updateFontWeight = (slideId: string, objectId: string, fontWeight: 'normal' | 'bold' ) => ({
    type: ActionType.UPDATE_FONT_WEIGHT,
    payload: {
        slideId,
        objectId,
        fontWeight
    }
});

const updateFontStyle = (slideId: string, objectId: string, fontStyle: 'normal' | 'italic' ) => ({
    type: ActionType.UPDATE_FONT_STYLE,
    payload: {
        slideId,
        objectId,
        fontStyle
    }
});

const updateTextDecoration = (slideId: string, objectId: string, textDecoration: 'none' | 'underline' ) => ({
    type: ActionType.UPDATE_TEXT_DECORATION,
    payload: {
        slideId,
        objectId,
        textDecoration
    }
});

const updateTextCase = (slideId: string, objectId: string, textCase: 'none' | 'capitalize' | 'uppercase' | 'lowercase' ) => ({
    type: ActionType.UPDATE_TEXT_CASE,
    payload: {
        slideId,
        objectId,
        textCase
    }
});


const fetchImages = (query: string) => {
    return fetchUnsplashImages(query);
};

const fetchBackgrounds = (query: string) => {
    return fetchUnsplashBackgrounds(query);
};
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
    updateTextContent,
    updateFontSize,
    updateFontFamily,
    updateFontColor,
    fetchImages,
    fetchBackgrounds,
    updateTextAlign,
    updateFontWeight,
    updateFontStyle,
    updateTextDecoration,
    updateTextCase
}