import {EditorType} from '../EditorType';

function renamePresentationTitle(editor: EditorType, newTitle: string): EditorType {
    console.log('Новое название презентации')
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: newTitle,
        }
    }
    
}

export {
    renamePresentationTitle,
}
