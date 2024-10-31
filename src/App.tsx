import styles from './App.module.css'
import {SlidesList} from "./view/slideList/SlidesList.tsx";
import {TopPanel} from "./view/topPanel/TopPanel.tsx";
import {Workspace} from "./view/workspace/Workspace.tsx";
import {Toolbar} from "./view/toolbar/Toolbar.tsx";
import {EditorType} from "./store/EditorType.ts";

type AppProps = {
    editor: EditorType,
}
function App({editor}: AppProps) {
    return (
        <div className='App'>
            <TopPanel title={editor.presentation.title}></TopPanel>
            <Toolbar></Toolbar>
            <div className={styles.container}>
                <SlidesList slides={editor.presentation.slides} selection={editor.selection}></SlidesList>
                <Workspace slide={editor.presentation.slides.find(slide => slide.id == editor.selection.selectedSlideId) || null} selectedObjId={editor.selection.selectedObjectId}></Workspace>
            </div>
        </div>
    )
}

export default App
