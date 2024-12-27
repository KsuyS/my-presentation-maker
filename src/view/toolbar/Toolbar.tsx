import styles from './Toolbar.module.css';
import { useAppSelector } from '../../store/Hooks/useAppSelector.ts';
import { useAppActions } from '../../store/Hooks/useAppActions.ts';
import { exportToJson, importFromJson } from "../../utils/jsonUtils";
import * as React from "react";
import { HistoryContext } from '../../store/Hooks/historyContext.ts';
import { generatePdfDataUrl } from '../../utils/ExportToPdf.ts';
import { importImageFromUnsplash } from "../../utils/UnsplashUtils";

import addSlideIcon from '../../assets/add-slide.png';
import removeSlideIcon from '../../assets/delete-slide.png';
import addTextIcon from '../../assets/add-slide.png';
import removeTextIcon from '../../assets/delete-slide.png';
import addImageIcon from '../../assets/add-slide.png';
import undoIcon from '../../assets/undo.png';
import redoIcon from '../../assets/redo.png';

import { useState, useEffect, useCallback } from 'react';

function Toolbar() {
    const [backgroundOption, setBackgroundOption] = useState<'color' | 'image'>('color');
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
    const { setEditor, addSlide, removeSlide, addText, addImage, removeObject, changeBackground } = useAppActions();
    const history = React.useContext(HistoryContext);
    const editor = useAppSelector((editor => editor));
    const [unsplashImages, setUnsplashImages] = useState<string[]>([]);
    const [isUnsplashModalOpen, setIsUnsplashModalOpen] = useState(false);
    const [unsplashQuery, setUnsplashQuery] = useState('');


    const onChangeImgUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result && typeof reader.result === 'string') {
                    addImage({ src: reader.result });
                } else {
                    console.error("Failed to read file as data URL");
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const onChangeColorBackground: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const color = (event.target as HTMLInputElement).value;
        changeBackground({ type: 'solid', value: color });
    };

    const onChangeImgBackground: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result && typeof reader.result === 'string') {
                    changeBackground({ type: 'image', value: reader.result });
                } else {
                    console.error("Failed to read file as data URL");
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleExport = () => {
        exportToJson(editor);
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

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            importFromJson(file, setEditor);
        }
    };

    const onUndo = useCallback(() => {
        const newEditor = history.undo();
        if (newEditor) {
            setEditor(newEditor);
        }
    }, [history, setEditor]);

    const onRedo = useCallback(() => {
        const newEditor = history.redo();
        if (newEditor) {
            setEditor(newEditor);
        }
    }, [history, setEditor]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().includes('MAC');
            const ctrlOrCmd = isMac ? event.metaKey : event.ctrlKey;

            if (ctrlOrCmd && event.key === 'z') {
                event.preventDefault();
                onUndo();
            }
            if (ctrlOrCmd && event.key === 'y') {
                event.preventDefault();
                onRedo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onUndo, onRedo]);

    const handleImportFromUnsplash = async () => {
        try {
            const images = await importImageFromUnsplash(unsplashQuery);
            if (images.length > 0) {
                setUnsplashImages(images);
                setIsUnsplashModalOpen(true);
            } else {
                console.error("No images found for this query.");
            }
        } catch (error) {
            console.error("Error fetching images from Unsplash:", error);
        }
    };

    const handleImageSelection = (src: string) => {
        addImage({ src });
        setIsUnsplashModalOpen(false);
    };


    return (
        <div className={styles.toolbar}>
            <button className={styles.button} onClick={addSlide}>
                <img className={styles.imageButton} src={addSlideIcon} alt="Добавить слайд" />
                Добавить слайд
            </button>
            <button className={styles.button} onClick={removeSlide}>
                <img className={styles.imageButton} src={removeSlideIcon} alt="Удалить слайд" />
                Удалить слайд
            </button>
            <button className={styles.button} onClick={addText}>
                <img className={styles.imageButton} src={addTextIcon} alt="Добавить текст" />
                Добавить текст
            </button>
            <div className={styles.changeImage}>
                <input
                    type="file"
                    id="imageUploader"
                    accept="image/*"
                    onChange={onChangeImgUpload}
                    className={styles.imageUploader}
                />
                <label htmlFor="imageUploader" className={`${styles.button} ${styles.fileLabel}`}>
                    <img className={styles.imageButton} src={addImageIcon} alt="Добавить изображение" />
                    Добавить изображение
                </label>
            </div>
            <button className={styles.button} onClick={removeObject}>
                <img className={styles.imageButton} src={removeTextIcon} alt="Удалить объект" />
                Удалить объект
            </button>
            <div className={styles.changeBackground}>
                <select
                    id="backgroundSelector"
                    value={backgroundOption}
                    onChange={(e) => setBackgroundOption(e.target.value as 'color' | 'image')}
                    className={`${styles.dropdown} ${styles.button}`}
                >
                    <option value="color">Цвет фона</option>
                    <option value="image">Фоновое изображение</option>
                </select>
            </div>

            {backgroundOption === 'color' && (
                <div className={styles.changeColor}>
                    <input
                        type="color"
                        id="colorPicker"
                        onChange={onChangeColorBackground}
                        className={`${styles.colorPicker}`}
                    />
                </div>
            )}

            {backgroundOption === 'image' && (
                <div className={styles.changeImage}>
                    <input
                        type="file"
                        id="bgImageUploader"
                        accept="image/*"
                        onChange={onChangeImgBackground}
                        className={styles.imageUploader}
                    />
                    <label htmlFor="bgImageUploader" className={`${styles.button} ${styles.fileLabel}`}>
                        Выберите изображение для фона
                    </label>
                </div>
            )}

            <button className={styles.button} onClick={handleExport}>
                Экспорт JSON
            </button>
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

            <button className={styles.button} onClick={onUndo}>
                <img className={styles.imageButton} src={undoIcon} alt="Undo" />
                Undo
            </button>

            <button className={styles.button} onClick={onRedo}>
                <img className={styles.imageButton} src={redoIcon} alt="Redo" />
                Redo
            </button>
            <button
                className={styles.button}
                onClick={() => {
                    setUnsplashQuery('');
                    setUnsplashImages([]);
                    setIsUnsplashModalOpen(true);
                }}
            >
                <img className={styles.imageButton} src={addImageIcon} alt="Unsplash" />
                Unsplash
            </button>

            {isUnsplashModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>Выберите изображение из Unsplash</h2>
                            <button
                                className={styles.closeButton}
                                onClick={() => setIsUnsplashModalOpen(false)}
                            >
                                Закрыть
                            </button>
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Введите запрос для поиска..."
                                value={unsplashQuery}
                                onChange={(e) => setUnsplashQuery(e.target.value)}
                                className={styles.unsplashInput}
                            />
                            <button
                                className={styles.button}
                                onClick={handleImportFromUnsplash}
                            >
                                Найти
                            </button>
                        </div>

                        <div className={styles.imageGrid}>
                            {unsplashImages.map((imgSrc, index) => (
                                <img
                                    key={index}
                                    src={imgSrc}
                                    alt={`Unsplash ${index}`}
                                    className={styles.imageItem}
                                    onClick={() => handleImageSelection(imgSrc)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


export { Toolbar };