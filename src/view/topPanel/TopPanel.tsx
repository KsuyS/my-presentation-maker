import styles from './TopPanel.module.css';
import * as React from "react";
import { useAppSelector } from '../../store/Hooks/useAppSelector.ts';
import { useAppActions } from '../../store/Hooks/useAppActions.ts';
import { exportToJson, importFromJson } from "../../utils/jsonUtils";
import { generatePdfDataUrl } from '../../utils/ExportToPdf.ts';

import logo from '../../assets/logo.png';
import { useState, } from 'react';

type TopPanelProps = {
    navigate: (path: string) => void;
};

function TopPanel({ navigate }: TopPanelProps) {
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
    const { setEditor } = useAppActions();
    const editor = useAppSelector((editor => editor))
    const title = editor.presentation.title

    const { renamePresentationTitle } = useAppActions()

    const onTitleChange: React.ChangeEventHandler = (event) => {
        renamePresentationTitle((event.target as HTMLInputElement).value)
    }

    const handleExport = () => {
        exportToJson(editor);
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            importFromJson(file, setEditor);
        }
    };

    const handlePreviewPdf = async () => {
        try {
            const dataUrl = await generatePdfDataUrl(editor);
            setPdfPreviewUrl(dataUrl);
        } catch (error) {
            console.error("Error generating PDF preview:", error);
        }
    };

    const handleClosePreview = () => {
        setPdfPreviewUrl(null);
    };

    return (
        <div className={styles.topPanel}>
            <img className={styles.logo} src={logo} />
            <input className={styles.title} type="text" defaultValue={title} onChange={onTitleChange} />

            <button className={styles.button} onClick={handleExport}>
                Экспорт JSON
            </button>
            <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: 'none' }}
                id="jsonFileInput"
            />
            <label htmlFor="jsonFileInput" className={`${styles.button}`}>
                Импорт
            </label>
            <button className={styles.button} onClick={handlePreviewPdf}>
                Предпросмотр PDF
            </button>

            {pdfPreviewUrl && (
                <div className={styles.pdfPreviewOverlay}>
                    <div className={styles.pdfPreviewContainer}>
                        <button className={styles.closePreviewButton} onClick={handleClosePreview}>
                            Закрыть
                        </button>
                        <iframe src={pdfPreviewUrl} className={styles.pdfPreviewIframe} title="PDF Preview"></iframe>

                    </div>
                </div>
            )}
            <button
                className={styles.navigateButton}
                onClick={() => navigate("/player")}>
                Перейти к плееру
            </button>
        </div>
    )
}

export {
    TopPanel,
}