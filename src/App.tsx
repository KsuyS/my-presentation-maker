import styles from './App.module.css';
import { SlidesList } from "./view/slideList/SlidesList";
import { TopPanel } from "./view/topPanel/TopPanel";
import { Workspace } from "./view/workspace/Workspace";
import { Toolbar } from "./view/toolbar/Toolbar";

type AppProps = {}

function App({ }: AppProps) {

    return (
        <div className='App'>
            <TopPanel></TopPanel>
            <Toolbar></Toolbar>
            <div className={styles.container}>
                <SlidesList></SlidesList>
                <Workspace></Workspace>
            </div>
        </div>
    );
}

export default App;
