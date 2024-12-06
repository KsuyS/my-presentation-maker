import { EditorType } from "../store/EditorType"

const saveToLocalStorage = (editor: EditorType) => {
    localStorage.setItem('presentationEditor', JSON.stringify(editor));
    console.log('Сохранено в localStorage:', editor);
};

const loadFromLocalStorage = (): EditorType | null => {
    const storedData = localStorage.getItem('presentationEditor');
    if (storedData) {
        const editorData = JSON.parse(storedData);
        console.log('Загружено из localStorage:', editorData);
        return editorData;
    }
    return null;
};

export { saveToLocalStorage, loadFromLocalStorage }