import styles from './App.module.css';
import { SlidesList } from "./view/slideList/SlidesList";
import { TopPanel } from "./view/topPanel/TopPanel";
import { Workspace } from "./view/workspace/Workspace";
import { Toolbar } from "./view/toolbar/Toolbar";
import { HistoryType } from './utils/history';
import { HistoryContext } from './store/Hooks/historyContext';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Player from './view/player/Player';
import MainPage from './view/mainPage/mainPage';

type AppProps = {
    history: HistoryType,
};

function EditorPage({ history }: AppProps) {
    const navigate = useNavigate();

    return (
        <div className={styles.App}>
            <HistoryContext.Provider value={history}>
                <TopPanel/>
                <Toolbar navigate={navigate}/>
                <div className={styles.container}>
                    <SlidesList />
                    <Workspace />
                </div>
            </HistoryContext.Provider>
        </div>
    );
}

function App({ history }: AppProps) {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/editor" element={<EditorPage history={history} />} />
                <Route path="/player" element={<Player />} />
            </Routes>
        </Router>
    );
}

export default App;