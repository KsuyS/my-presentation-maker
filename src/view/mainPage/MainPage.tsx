import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css';
import { defaultEditor } from '../../store/redux/defaultEditor';
import { useAppActions } from '../../store/Hooks/useAppActions';
import { importFromJson } from '../../utils/jsonUtils';
import main from '../../assets/main.png';

function MainPage() {
    const navigate = useNavigate();
    const { setEditor } = useAppActions();

    const handleCreatePresentation = () => {
        setEditor(defaultEditor);
        navigate('/editor');
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            importFromJson(file, (importedEditor) => {
                setEditor(importedEditor);
                navigate('/editor');
            });
        }
    };

    return (
        <div className={styles.mainPage}>
            <img className={styles.logo} src={main} alt="Presentation Maker Logo" />
            <h1 className={styles.header}>
                Presentation Maker
                <br />
                <span style={{ fontSize: '24px', fontWeight: 'normal', color: '#6c757d' }}>
                    Создавай свою презентацию
                </span>
            </h1>
            <div className={styles.buttonContainer}>
                <button
                    className={styles.createButton}
                    onClick={handleCreatePresentation}>
                    Создать презентацию
                </button>

                <div className={styles.importContainer}>
                    <input
                        type="file"
                        accept=".json"
                        onChange={handleImport}
                        className={styles.fileInput}
                        id="jsonFileInput"/>
                    <label
                        htmlFor="jsonFileInput"
                        className={styles.importButton}>
                        Загрузить презентацию
                    </label>
                </div>
            </div>
        </div>
    );
}

export default MainPage;