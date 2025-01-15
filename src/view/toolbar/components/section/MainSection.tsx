import React from 'react';
import styles from '../../Toolbar.module.css';
import addSlideIcon from '../../../../assets/add-slide.png';
import removeIcon from '../../../../assets/delete.png';
import undoIcon from '../../../../assets/undo.png';
import redoIcon from '../../../../assets/redo.png';
import exportIcon from '../../../../assets/export.png';
import importIcon from '../../../../assets/import.png';
import pdfIcon from '../../../../assets/pdf.png';
import playerIcon from '../../../../assets/player.png';

interface MainSectionProps {
    actions: {
        addSlide: () => void;
        removeSlide: () => void;
        handleExport: () => void;
        handleImport: (file: File) => void;
    };
    history: {
        onUndo: () => void;
        onRedo: () => void;
    };
    pdfHandling: {
        handlePreviewPdf: () => void;
    };
    navigate: (path: string) => void;
    isEmptyPresentation: boolean;
}

export const MainSection: React.FC<MainSectionProps> = ({
    actions,
    pdfHandling,
    navigate,
    isEmptyPresentation
}) => {
    return (
        <div className={styles.sectionContent}>
            <button
                className={styles.toolButton}
                title="Добавить слайд"
                onClick={actions.addSlide}
            >
                <img src={addSlideIcon} alt="Добавить слайд" />
            </button>

            <button
                className={styles.toolButton}
                title="Удалить слайд"
                onClick={actions.removeSlide}
                disabled={isEmptyPresentation}
            >
                <img src={removeIcon} alt="Удалить слайд" />
            </button>

            <button
                className={styles.toolButton}
                title="Отменить"
                onClick={actions.onUndo}
            >
                <img src={undoIcon} alt="Отменить" />
            </button>

            <button
                className={styles.toolButton}
                title="Повторить"
                onClick={actions.onRedo}
            >
                <img src={redoIcon} alt="Повторить" />
            </button>

            <button
                className={styles.toolButton}
                title="Экспорт JSON"
                onClick={actions.handleExport}
                disabled={isEmptyPresentation}
            >
                <img src={exportIcon} alt="Экспорт JSON" />
            </button>

            <div className={styles.toolButton} title="Импорт JSON">
                <input
                    type="file"
                    accept=".json"
                    onChange={(e) => e.target.files && actions.handleImport(e.target.files[0])}
                    className={styles.imageUploader}
                    id="jsonFileInput"
                />
                <label htmlFor="jsonFileInput">
                    <img src={importIcon} alt="Импорт JSON" />
                </label>
            </div>

            <button
                className={styles.toolButton}
                title="Предпросмотр PDF"
                onClick={pdfHandling.handlePreviewPdf}
                disabled={isEmptyPresentation}
            >
                <img src={pdfIcon} alt="Предпросмотр PDF" />
            </button>

            <button
                className={styles.toolButton}
                title="Слайд-шоу"
                onClick={() => navigate("/player")}
                disabled={isEmptyPresentation}
            >
                <img src={playerIcon} alt="Слайд-шоу" />
            </button>
        </div>
    );
};