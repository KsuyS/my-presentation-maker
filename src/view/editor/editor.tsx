import styles from './editor.module.css';
import { SlidesList } from "../slideList/SlidesList";
import { TopPanel } from '../topPanel/TopPanel';
import { Workspace } from '../workspace/Workspace';
import { Toolbar } from '../toolbar/Toolbar';
import { HistoryType } from '../../utils/history';
import { HistoryContext } from '../../store/Hooks/historyContext';
import { useNavigate } from "react-router-dom";

type AppProps = {
    history: HistoryType,
};

function EditorPage({ history }: AppProps) {
    const navigate = useNavigate();

    return (
        <div className={styles.App}>
            <HistoryContext.Provider value={history}>
                <TopPanel />
                <Toolbar navigate={navigate} />
                <div className={styles.container}>
                    <SlidesList />
                    <Workspace />
                </div>
            </HistoryContext.Provider>
        </div>
    );
}

export default EditorPage ;