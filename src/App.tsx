import styles from './App.module.css';
import { SlidesList } from "./view/slideList/SlidesList";
import { TopPanel } from "./view/topPanel/TopPanel";
import { Workspace } from "./view/workspace/Workspace";
import { Toolbar } from "./view/toolbar/Toolbar";
import { EditorType } from "./store/Editor/EditorType";

type AppProps = {
    editor: EditorType,
    setEditor: (editor: EditorType) => void;
}

function App({ editor }: AppProps) {
    return (
        <div className='App'>
            <TopPanel title={editor.presentation.title}></TopPanel>
            <Toolbar></Toolbar>
            <div className={styles.container}>
                <SlidesList slides={editor.presentation.slides} selection={editor.selection}></SlidesList>
                <Workspace slide={editor.presentation.slides.find(slide => slide.id === editor.selection.selectedSlideId) || null} selectedObjId={editor.selection.selectedObjectId}></Workspace>
            </div>
        </div>
    );
}

export default App;