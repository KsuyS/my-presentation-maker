import { HistoryType } from './utils/history';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Player from './view/player/Player';
import MainPage from './view/mainPage/MainPage';
import EditorPage from './view/editor/editor'

type AppProps = {
    history: HistoryType,
};


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