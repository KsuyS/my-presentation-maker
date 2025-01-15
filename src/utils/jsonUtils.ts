import { EditorType } from '../store/EditorType';
import { validate } from './PresentationSchema';
import { saveToLocalStorage } from './storage';

const normalizeSelection = (editor: EditorType): EditorType => {
    const firstSlideId = editor.presentation.slides.length > 0 ? editor.presentation.slides[0].id : null;
    return {
        ...editor,
        selection: {
            selectedSlideIds: firstSlideId ? [firstSlideId] : [],
            selectedObjectId: null,
        }
    };
};

const exportToJson = (editor: EditorType) => {
    const normalizedEditor = normalizeSelection(editor);

    const jsonString = JSON.stringify(normalizedEditor, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = editor.presentation.title ? `${editor.presentation.title}.json` : 'presentation.json';
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
                    alert("Импортированные данные не соответствуют ожидаемому формату.")
                    return;
                }

                const normalizedEditor = normalizeSelection(importedEditor);
                setEditor(normalizedEditor);
                saveToLocalStorage(normalizedEditor);
            } catch (error) {
                alert("Ошибка при импорте JSON.")
            }
        }
    };

    reader.readAsText(file);
};

export {
    exportToJson,
    importFromJson
};