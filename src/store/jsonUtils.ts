import { loadFromLocalStorage, saveToLocalStorage } from '../store/storage';
import { EditorType } from '../store/EditorType';
import { setEditor } from './editor';

const exportToJson = (editor: EditorType) => {
    const jsonString = JSON.stringify(editor, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'presentation.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const importFromJson = (file: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
        const jsonString = event.target?.result;
        if (typeof jsonString === 'string') {
            try {
                const importedEditor: EditorType = JSON.parse(jsonString);

                if (!isValidEditor(importedEditor)) {
                    console.error("Импортированные данные не соответствуют ожидаемому формату.");
                    return;
                }

                console.log("Импорт успешен:", importedEditor);

                if (importedEditor) {
                    saveToLocalStorage(importedEditor);
                    const loadedEditor = loadFromLocalStorage();
                    if (loadedEditor) {
                        console.log('Loaded editor state from localStorage:', loadedEditor);
                        setEditor(loadedEditor);
                    } else {
                        console.log('Нет редактора');
                    }
                }
            } catch (error) {
                console.error("Ошибка при импорте JSON:", error);
            }
        }
    };
    reader.readAsText(file);
};

const isValidEditor = (data: any): data is EditorType => {
    return data && typeof data.presentation === 'object' && Array.isArray(data.presentation.slides);
};

export { exportToJson, importFromJson }