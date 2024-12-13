import { Presentation } from "./PresentationType.ts";
import { EditorType } from "./EditorType.ts";
import { loadFromLocalStorage, saveToLocalStorage } from '../Utils/storage.ts';

const initialPresentation: Presentation = {
    title: "Новая презентация",
    slides: [
        {
            id: "slide1",
            content: [],
            background: { type: 'solid', color: '#e6e8e6' },
        },
    ]
};

let _editor = loadFromLocalStorage() || {
    presentation: initialPresentation,
    selection: {
        selectedSlideId: initialPresentation.slides[0].id,
        selectedObjectId: null
    }
};

let _handler = null;

function getEditor() {
    return _editor;
}

function setEditor(newEditor: EditorType): void {
    _editor = newEditor;
    
    saveToLocalStorage(_editor);
    if (_handler) {
        _handler();
    }
}

function dispatch(modifyFn: Function, payload?: Object): void {
    const newEditor = modifyFn(_editor, payload);
    setEditor(newEditor);
}

function addEditorChangeHandler(handler: Function): void {
    _handler = handler;
}

export {
    getEditor,
    setEditor,
    dispatch,
    addEditorChangeHandler,
}