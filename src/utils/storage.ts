import { EditorType } from '../store/EditorType';
import { validate } from './PresentationSchema';

const saveToLocalStorage = (editor: EditorType) => {
    localStorage.setItem('presentationEditor', JSON.stringify(editor));
    console.log('Сохранено в localStorage:', editor);
};

const loadFromLocalStorage = (): EditorType | null => {
    const storedData = localStorage.getItem('presentationEditor');
    if (storedData) {
        const editorData = JSON.parse(storedData);
        console.log('Загружено из localStorage:', editorData);

        const valid = validate(editorData.presentation);
        if (!valid) {
            alert("Ошибки валидации.")
            return null;
        }

        return editorData;
    }
    return null;
};

export { saveToLocalStorage, loadFromLocalStorage };