import styles from './App.module.css';
import { SlidesList } from "./view/slideList/SlidesList";
import { TopPanel } from "./view/topPanel/TopPanel";
import { Workspace } from "./view/workspace/Workspace";
import { Toolbar } from "./view/toolbar/Toolbar";
import { HistoryType } from './utils/history';
import { HistoryContext } from './store/Hooks/historyContext';

type AppProps = {
    history: HistoryType,
}

function App({ history }: AppProps) {

    return (
        <div className='App'>
            <HistoryContext.Provider value={history}>
                <TopPanel></TopPanel>
                <Toolbar></Toolbar>
                <div className={styles.container}>
                    <SlidesList></SlidesList>
                    <Workspace></Workspace>
                </div>
            </HistoryContext.Provider>
        </div >
    );
}
export default App