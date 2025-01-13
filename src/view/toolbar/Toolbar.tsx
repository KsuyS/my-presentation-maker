import styles from './Toolbar.module.css';
import { useAppActions } from '../../store/Hooks/useAppActions.ts';
import * as React from "react";
import { HistoryContext } from '../../store/Hooks/historyContext.ts';
import { exportToJson, importFromJson } from "../../utils/jsonUtils";
import { exportToPdf, generatePdfDataUrl } from '../../utils/ExportToPdf.ts';
import { TextContent } from '../../store/PresentationType.ts';


import { importImageFromUnsplash } from "../../utils/UnsplashUtils";

import addSlideIcon from '../../assets/add-slide.png';
import removeIcon from '../../assets/delete.png';
import addTextIcon from '../../assets/add-text.png';
import addImageIcon from '../../assets/add-image.png';
import undoIcon from '../../assets/undo.png';
import backgroundIcon from '../../assets/background.png';
import backgroundUnsplashIcon from '../../assets/backgroundUnsplash.png';
import unsplashIcon from '../../assets/unsplash.png';
import redoIcon from '../../assets/redo.png';
import exportIcon from '../../assets/export.png';
import importIcon from '../../assets/import.png';
import pdfIcon from '../../assets/pdf.png';
import playerIcon from '../../assets/player.png';
import gradientIcon from '../../assets/gradient.png';

import { useAppSelector } from '../../store/Hooks/useAppSelector.ts';
import { useState, useEffect, useCallback } from 'react';

type ToolbarProps = {
    navigate: (path: string) => void;
};

function Toolbar({ navigate }: ToolbarProps) {
    const { setEditor, addSlide, removeSlide, addText, addImage, removeObject, changeBackground, updateFontSize,
        updateFontFamily, updateFontColor } = useAppActions();
    const history = React.useContext(HistoryContext);
    const [unsplashImages, setUnsplashImages] = useState<string[]>([]);
    const [isUnsplashModalOpen, setIsUnsplashModalOpen] = useState(false);
    const [unsplashQuery, setUnsplashQuery] = useState('');
    const [activeSection, setActiveSection] = useState('main');
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
    const editor = useAppSelector((editor => editor))
    const [isGradientVisible, setIsGradientVisible] = useState(false)
    const [isUnsplashModalOpenForBackground, setIsUnsplashModalOpenForBackground] = useState(false);
    const [unsplashBackgroundQuery, setUnsplashBackgroundQuery] = useState('');
    const [unsplashBackgroundImages, setUnsplashBackgroundImages] = useState<string[]>([]);


    const selection = useAppSelector((editor) => {
        const selectedSlideIds = editor.selection?.selectedSlideIds || [];

        const selectedSlides = editor.presentation.slides.filter(slide => selectedSlideIds.includes(slide.id));
        const selectedObject = selectedSlides[0]?.content.find(object => object.id === editor.selection?.selectedObjectId);

        return {
            ...editor.selection,
            selectedObject,
        };
    });
    const isTextSelected = selection.selectedObject?.type === 'text';
    const isImageSelected = selection.selectedObject?.type === 'image';
    const isEmptyPresentation = editor.presentation.slides.length === 0;

    const sections = {
        main: 'Главная',
        background: 'Фон',
        text: 'Текст',
        images: 'Изображения'
    };

    const fontFamilies = ['Arial', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia'];
    const fontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40];
    const [fontFamily, setFontFamily] = useState(fontFamilies[0]);
    const [fontSize, setFontSize] = useState(12);
    const [fontColor, setFontColor] = useState('#000000');

    const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
    const [gradientDirection, setGradientDirection] = useState<string>('to right');
    const [gradientStartColor, setGradientStartColor] = useState<string>('#ffffff');
    const [gradientEndColor, setGradientEndColor] = useState<string>('#000000');
    const [gradientRadialShape, setGradientRadialShape] = useState<'circle' | 'ellipse'>('circle');
    const [gradientRadialPosition, setGradientRadialPosition] = useState<{ x: string; y: string; }>({ x: '50%', y: '50%' });


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

    const handleSavePdf = () => {
        if (pdfPreviewUrl) {
            exportToPdf(editor);
        }
    };

    const handleGradientBackgroundChange = () => {
        let value = '';

        if (gradientType === 'linear') {
            value = `linear-gradient(${gradientDirection}, ${gradientStartColor}, ${gradientEndColor})`;
        } else {
            value = `radial-gradient(${gradientRadialShape} at ${gradientRadialPosition.x} ${gradientRadialPosition.y}, ${gradientStartColor}, ${gradientEndColor})`;
        }
        changeBackground({ type: 'gradient', value });
    };

    const handleSetActiveSection = (section: string) => {
        setActiveSection(section);
        if (section !== 'background') {
            setIsGradientVisible(false);
        }
    };

    useEffect(() => {
        if (selection.selectedObject?.type === 'text') {
            const textElement = selection.selectedObject as TextContent;
            setFontFamily(textElement.fontFamily || fontFamilies[0]);
            setFontSize(textElement.fontSize || 12);
            setFontColor(textElement.fontColor || '#000000');
        }
    }, [selection.selectedObject]);

    const handleImportBackgroundFromUnsplash = async () => {
        try {
            const images = await importImageFromUnsplash(unsplashBackgroundQuery);
            if (images.length > 0) {
                setUnsplashBackgroundImages(images);
            } else {
                console.error("No images found for this query.");
            }
        } catch (error) {
            console.error("Error fetching images from Unsplash:", error);
        }
    };

    const handleBackgroundImageSelection = (src: string) => {
        changeBackground({ type: 'image', value: src });
        setIsUnsplashModalOpenForBackground(false);
    };

    return (
        <div className={styles.toolbarContainer}>
            <div className={styles.toolbarNav}>
                {Object.entries(sections).map(([key, value]) => (
                    <button
                        key={key}
                        className={`${styles.navButton} ${activeSection === key ? styles.active : ''}`}
                        onClick={() => handleSetActiveSection(key)}
                    >
                        {value}
                    </button>
                ))}
            </div>

            <div className={styles.toolbarContent}>
                {activeSection === 'main' && (
                    <div className={styles.sectionContent}>
                        <button className={styles.toolButton} title="Добавить слайд" onClick={addSlide}>
                            <img src={addSlideIcon} alt="Добавить слайд" />
                        </button>
                        <button className={styles.toolButton} title="Удалить слайд" onClick={removeSlide} disabled={isEmptyPresentation}>
                            <img src={removeIcon} alt="Удалить слайд" />
                        </button>
                        <button className={styles.toolButton} title="Отменить" onClick={onUndo}>
                            <img src={undoIcon} alt="Отменить" />
                        </button>
                        <button className={styles.toolButton} title="Повторить" onClick={onRedo}>
                            <img src={redoIcon} alt="Повторить" />
                        </button>
                        <button className={styles.toolButton} title="Экспорт JSON" onClick={handleExport} disabled={isEmptyPresentation}>
                            <img src={exportIcon} alt="Экспорт JSON" />
                        </button>

                        <div className={styles.toolButton} title="Импорт JSON">
                            <input
                                type="file"
                                accept=".json"
                                onChange={handleImport}
                                className={styles.imageUploader}
                                id="jsonFileInput"
                            />
                            <label htmlFor="jsonFileInput">
                                <img src={importIcon} alt="Импорт JSON" />
                            </label>
                        </div>

                        <button className={styles.toolButton} title="Предпросмотр PDF" onClick={handlePreviewPdf} disabled={isEmptyPresentation}>
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
                )}
                {pdfPreviewUrl && (
                    <div className={styles.pdfPreviewOverlay}>
                        <div className={styles.pdfPreviewContainer}>
                            <div className={styles.pdfPreviewHeader}>
                                <h2>Предпросмотр PDF</h2>
                                <div className={styles.buttonGroup}>
                                    <button className={styles.saveButton} onClick={handleSavePdf}>
                                        Сохранить PDF
                                    </button>
                                    <button className={styles.closeButton} onClick={() => setPdfPreviewUrl(null)}>
                                        Закрыть
                                    </button>
                                </div>
                            </div>

                            <div className={styles.pdfViewer}>
                                <iframe
                                    src={pdfPreviewUrl}
                                    className={styles.pdfPreviewIframe}
                                    title="PDF Preview"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'background' && (
                    <div className={styles.sectionContent}>
                        <div className={styles.toolButton} title="Цвет">
                            <input
                                disabled={isEmptyPresentation}
                                type="color"
                                onChange={onChangeColorBackground}
                                className={styles.colorPicker}
                            />
                        </div>
                        <button
                            className={styles.toolButton}
                            disabled={isEmptyPresentation}
                            title="Градиент"
                            onClick={() => setIsGradientVisible(!isGradientVisible)}
                        >
                            <img src={gradientIcon} alt="Градиент" />
                        </button>
                        <div className={styles.toolButton} title="Изображение с компьютера">
                            <input
                                disabled={isEmptyPresentation}
                                type="file"
                                id="bgImageUploader"
                                accept="image/*"
                                onChange={onChangeImgBackground}
                                className={styles.imageUploader}
                            />
                            <label htmlFor="bgImageUploader">
                                <img src={backgroundIcon} alt="Изображение с компьютера" />
                            </label>
                        </div>
                        <button
                            className={styles.toolButton}
                            disabled={isEmptyPresentation}
                            title="Изображение из Unsplash"
                            onClick={() => setIsUnsplashModalOpenForBackground(true)}
                        >
                            <img src={backgroundUnsplashIcon} alt="Изображение из Unsplash" />
                        </button>
                        {isGradientVisible && (
                            <div className={styles.gradientControls}>
                                <select
                                    value={gradientType}
                                    onChange={(e) => setGradientType(e.target.value as 'linear' | 'radial')}
                                    className={styles.toolBtn}
                                >
                                    <option value="linear">Линейный</option>
                                    <option value="radial">Радиальный</option>
                                </select>

                                {gradientType === 'linear' && (
                                    <select
                                        value={gradientDirection}
                                        onChange={(e) => setGradientDirection(e.target.value)}
                                        className={styles.toolBtn}
                                    >
                                        <option value="to right">Вправо</option>
                                        <option value="to left">Влево</option>
                                        <option value="to bottom">Вниз</option>
                                        <option value="to top">Вверх</option>
                                        <option value="to bottom right">Внизу справа</option>
                                        <option value="to bottom left">Внизу слева</option>
                                        <option value="to top right">Вверху справа</option>
                                        <option value="to top left">Вверху слева</option>
                                    </select>
                                )}

                                {gradientType === 'radial' && (
                                    <>
                                        <select
                                            value={gradientRadialShape}
                                            onChange={(e) => setGradientRadialShape(e.target.value as 'circle' | 'ellipse')}
                                            className={styles.toolBtn}
                                        >
                                            <option value="circle">Круг</option>
                                            <option value="ellipse">Эллипс</option>
                                        </select>
                                        <div className={styles.radialPosition}>
                                            <span>X: </span>
                                            <input
                                                type="text"
                                                value={gradientRadialPosition.x}
                                                onChange={(e) => setGradientRadialPosition({ ...gradientRadialPosition, x: e.target.value })}
                                                className={styles.toolBtn}
                                            />
                                            <span> Y: </span>
                                            <input
                                                type="text"
                                                value={gradientRadialPosition.y}
                                                onChange={(e) => setGradientRadialPosition({ ...gradientRadialPosition, y: e.target.value })}
                                                className={styles.toolBtn}
                                            />
                                        </div>
                                    </>
                                )}

                                <input
                                    type="color"
                                    value={gradientStartColor}
                                    onChange={(e) => setGradientStartColor(e.target.value)}
                                    className={styles.colorPicker}
                                    title="Start Color"
                                />
                                <input
                                    type="color"
                                    value={gradientEndColor}
                                    onChange={(e) => setGradientEndColor(e.target.value)}
                                    className={styles.colorPicker}
                                    title="End Color"
                                />
                                <button onClick={handleGradientBackgroundChange} className={styles.button}>
                                    Применить
                                </button>
                            </div>
                        )}
                        {isUnsplashModalOpenForBackground && (
                            <div className={styles.modalOverlay}>
                                <div className={styles.modalContent}>
                                    <div className={styles.modalHeader}>
                                        <h2>Выберите фон из Unsplash</h2>
                                        <button
                                            className={styles.closeButton}
                                            onClick={() => setIsUnsplashModalOpenForBackground(false)}
                                        >
                                            Закрыть
                                        </button>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Введите запрос для поиска..."
                                            value={unsplashBackgroundQuery}
                                            onChange={(e) => setUnsplashBackgroundQuery(e.target.value)}
                                            className={styles.unsplashInput}
                                        />
                                        <button
                                            className={styles.button}
                                            onClick={handleImportBackgroundFromUnsplash}
                                        >
                                            Найти
                                        </button>
                                    </div>
                                    <div className={styles.imageGrid}>
                                        {unsplashBackgroundImages.map((imgSrc, index) => (
                                            <img
                                                key={index}
                                                src={imgSrc}
                                                alt={`Unsplash ${index}`}
                                                className={styles.imageItem}
                                                onClick={() => handleBackgroundImageSelection(imgSrc)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeSection === 'text' && (
                    <div className={styles.sectionContent}>
                        <button className={styles.toolButton} title="Добавить текст" onClick={addText} disabled={isEmptyPresentation}>
                            <img src={addTextIcon} alt="Добавить текст" />
                        </button>
                        <button className={styles.toolButton} title="Удалить текст" onClick={removeObject} disabled={!isTextSelected || isEmptyPresentation} >
                            <img src={removeIcon} alt="Удалить текст" />

                        </button>
                        <select
                            className={`${styles.toolButton} ${styles.toolBtn}`}
                            title="Шрифт"
                            value={fontFamily}
                            onChange={(e) => {
                                const newFontFamily = e.target.value;
                                setFontFamily(newFontFamily);
                                updateFontFamily({
                                    slideId: selection.selectedSlideIds[0] ?? '',
                                    objectId: selection.selectedObjectId ?? '',
                                    fontFamily: newFontFamily,
                                });
                            }}
                            disabled={!isTextSelected || isEmptyPresentation}
                        >
                            {fontFamilies.map((family) => (
                                <option key={family} value={family}>{family}</option>
                            ))}
                        </select>

                        <select
                            className={`${styles.toolButton} ${styles.toolBtn}`}
                            title="Размер шрифта"
                            value={fontSize}
                            onChange={(e) => {
                                const newFontSize = parseInt(e.target.value, 10);
                                setFontSize(newFontSize);
                                updateFontSize({
                                    slideId: selection.selectedSlideIds[0] ?? '',
                                    objectId: selection.selectedObjectId ?? '',
                                    fontSize: newFontSize,
                                });
                            }}
                            disabled={!isTextSelected || isEmptyPresentation}
                        >
                            {fontSizes.map((size) => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>

                        <div className={styles.toolButton} title="Цвет текста">
                            <input
                                type="color"
                                value={fontColor}
                                onChange={(e) => {
                                    const newFontColor = e.target.value;
                                    setFontColor(newFontColor);
                                    updateFontColor({
                                        slideId: selection.selectedSlideIds[0] ?? '',
                                        objectId: selection.selectedObjectId ?? '',
                                        fontColor: newFontColor,
                                    });
                                }}
                                className={styles.colorPicker}
                                disabled={!isTextSelected || isEmptyPresentation}
                            />
                        </div>
                    </div>
                )}
                {activeSection === 'images' && (
                    <div className={styles.sectionContent}>
                        <div className={styles.toolButton} title="Добавить изображение с компьютера">
                            <input
                                type="file"
                                disabled={isEmptyPresentation}
                                id="imageUploader"
                                accept="image/*"
                                onChange={onChangeImgUpload}
                                className={styles.imageUploader} />
                            <label htmlFor="imageUploader">
                                <img src={addImageIcon} alt="Добавить изображение" />
                            </label>
                        </div>
                        <button
                            className={styles.toolButton}
                            title="Добавить изображение из Unsplash"
                            disabled={isEmptyPresentation}
                            onClick={() => setIsUnsplashModalOpen(true)}>
                            <img src={unsplashIcon} alt="Unsplash" />
                        </button>
                        <button className={styles.toolButton} title="Удалить изображение" onClick={removeObject} disabled={!isImageSelected}>
                            <img src={removeIcon} alt="Удалить изображение" />
                        </button>
                    </div>
                )}
            </div>

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