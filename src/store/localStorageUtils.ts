const saveEditorState = (state: any) => {
    localStorage.setItem('editorState', JSON.stringify(state));
};

const loadEditorState = () => {
    const savedState = localStorage.getItem('editorState');
    if (savedState) {
        return JSON.parse(savedState);
    }
    return null; // or return a default state
};

export {
    saveEditorState,
    loadEditorState
}