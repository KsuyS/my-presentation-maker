import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { addEditorChangeHandler, getEditor, setEditor } from "./store/Editor/editor.ts";

const root = createRoot(document.getElementById('root')!);

function render() {
    const editor = getEditor();

    root.render(
        <StrictMode>
            <App editor={editor} setEditor={setEditor} />
        </StrictMode>,
    );
}

addEditorChangeHandler(render);

render();