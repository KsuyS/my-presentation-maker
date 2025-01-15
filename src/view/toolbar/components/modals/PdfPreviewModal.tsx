import React from 'react';
import styles from '../../Toolbar.module.css';

interface PdfPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    pdfUrl: string | null;
    onSave: () => void;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
    isOpen,
    onClose,
    pdfUrl,
    onSave
}) => {
    if (!isOpen || !pdfUrl) return null;

    return (
        <div className={styles.pdfPreviewOverlay}>
            <div className={styles.pdfPreviewContainer}>
                <div className={styles.pdfPreviewHeader}>
                    <h2>Предпросмотр PDF</h2>
                    <div className={styles.buttonGroup}>
                        <button 
                            className={styles.saveButton}
                            onClick={onSave}
                        >
                            Сохранить PDF
                        </button>
                        <button 
                            className={styles.closeButton}
                            onClick={onClose}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
                <div className={styles.pdfViewer}>
                    <iframe
                        src={pdfUrl}
                        className={styles.pdfPreviewIframe}
                        title="PDF Preview"
                    />
                </div>
            </div>
        </div>
    );
};