import { EditorType } from "../store/EditorType";
import { validate } from './PresentationSchema';
import { saveToLocalStorage } from "./storage";

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

const importFromJson = (file: File, setEditor: (editor: EditorType) => void) => {
    const reader = new FileReader();

    reader.onload = (event) => {
        const jsonString = event.target?.result;
        if (typeof jsonString === 'string') {
            try {
                const importedEditor: EditorType = JSON.parse(jsonString);

                if (!validate(importedEditor.presentation)) {
                    console.error("Импортированные данные не соответствуют ожидаемому формату:", validate.errors);
                    return;
                }

                console.log("Импорт успешен:", importedEditor);
                setEditor(importedEditor);
                saveToLocalStorage(importedEditor);

            } catch (error) {
                console.error("Ошибка при импорте JSON:", error);
            }
        }
    };

    reader.readAsText(file);
};

export { exportToJson, importFromJson };