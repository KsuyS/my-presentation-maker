import styles from './Toolbar.module.css';
import { useAppActions } from '../../store/Hooks/useAppActions.ts';
import * as React from "react";
import { HistoryContext } from '../../store/Hooks/historyContext.ts';
import { exportToJson, importFromJson } from "../../utils/jsonUtils";
import { exportToPdf, generatePdfDataUrl } from '../../utils/ExportToPdf.ts';
import { TextContent } from '../../store/PresentationType.ts';

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
import alignLeftIcon from '../../assets/leftAlign.png';
import alignCenterIcon from '../../assets/centerAlign.png';
import alignRightIcon from '../../assets/rightAlign.png';
import fontWeightIcon from '../../assets/bold.png';
import fontStyleIcon from '../../assets/italic.png';
import textDecorationIcon from '../../assets/decoration.png';
import textCaseIcon from '../../assets/case.png';

import { useAppSelector } from '../../store/Hooks/useAppSelector.ts';
import { useState, useEffect, useCallback } from 'react';

type ToolbarProps = {
    navigate: (path: string) => void;
};

function Toolbar({ navigate }: ToolbarProps) {
    const {
        setEditor,
        addSlide,
        removeSlide,
        addText,
        addImage,
        removeObject,
        changeBackground,
        updateFontSize,
        updateFontFamily,
        updateFontColor,
        fetchImages,
        fetchBackgrounds,
        updateTextAlign,
        updateFontWeight,
        updateFontStyle,
        updateTextDecoration,
        updateTextCase,
        updateTextBackground
    } = useAppActions();

    const history = React.useContext(HistoryContext);
    const [activeSection, setActiveSection] = useState('main');
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
    const editor = useAppSelector((editor => editor));
    const [isGradientVisible, setIsGradientVisible] = useState(false);

    // Состояния для модальных окон
    const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    // Состояния для поисковых запросов
    const [imageSearchQuery, setImageSearchQuery] = useState('');
    const [backgroundSearchQuery, setBackgroundSearchQuery] = useState('');

    // Селекторы для Unsplash
    const images = useAppSelector(state => state.unsplash?.images?.data ?? []);
    const imagesLoading = useAppSelector(state => state.unsplash?.images?.loading ?? false);
    const imagesError = useAppSelector(state => state.unsplash?.images?.error ?? null);

    const backgrounds = useAppSelector(state => state.unsplash?.backgrounds?.data ?? []);
    const backgroundsLoading = useAppSelector(state => state.unsplash?.backgrounds?.loading ?? false);
    const backgroundsError = useAppSelector(state => state.unsplash?.backgrounds?.error ?? null);

    // Селектор для выбранных элементов
    const selection = useAppSelector((editor) => {
        const selectedSlideIds = editor.selection?.selectedSlideIds || [];
        const selectedSlides = editor.presentation.slides.filter(slide =>
            selectedSlideIds.includes(slide.id)
        );
        const selectedObject = selectedSlides[0]?.content.find(
            object => object.id === editor.selection?.selectedObjectId
        );

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

    // Настройки текста
    const fontFamilies = ['Arial', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia'];
    const fontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40];
    const [fontFamily, setFontFamily] = useState(fontFamilies[0]);
    const [fontSize, setFontSize] = useState(12);
    const [fontColor, setFontColor] = useState('#000000');
    const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isDecoration, setisDecoration] = useState(false);
    const [isTextCaseDropdownOpen, setIsTextCaseDropdownOpen] = useState(false);
    const [textCase, setTextCase] = useState<'capitalize' | 'uppercase' | 'lowercase'>('capitalize');
    const [backgroundColor, setTextBackground] = useState('#000000');

    const handleTextAlign = (align: 'left' | 'center' | 'right') => {
        if (editor.selection.selectedSlideIds.length > 0 && editor.selection.selectedObjectId) {
            editor.selection.selectedSlideIds.forEach(slideId => {
                updateTextAlign(slideId, editor.selection.selectedObjectId!, align);
            });
        }
    };

    const handleFontWeight = () => {
        if (editor.selection.selectedSlideIds.length > 0 && editor.selection.selectedObjectId) {
            const newFontWeight = isBold ? 'normal' : 'bold';
            editor.selection.selectedSlideIds.forEach(slideId => {
                updateFontWeight(
                    slideId, editor.selection.selectedObjectId!, newFontWeight,
                );
            });
            setIsBold(!isBold);
        }
    };

    const handleFontStyle = () => {
        if (editor.selection.selectedSlideIds.length > 0 && editor.selection.selectedObjectId) {
            const newFontStyle = isItalic ? 'normal' : 'italic';
            editor.selection.selectedSlideIds.forEach(slideId => {
                updateFontStyle(
                    slideId, editor.selection.selectedObjectId!, newFontStyle,
                );
            });
            setIsItalic(!isItalic);
        }
    };

    const handleTextDecoration = () => {
        if (editor.selection.selectedSlideIds.length > 0 && editor.selection.selectedObjectId) {
            const newTextDecoration = isDecoration ? 'none' : 'underline';
            editor.selection.selectedSlideIds.forEach(slideId => {
                updateTextDecoration(
                    slideId, editor.selection.selectedObjectId!, newTextDecoration,
                );
            });
            setisDecoration(!isDecoration);
        }
    };

    const handleTextCase = (newTextCase: 'capitalize' | 'uppercase' | 'lowercase') => {
        if (editor.selection.selectedSlideIds.length > 0 && editor.selection.selectedObjectId) {
            editor.selection.selectedSlideIds.forEach(slideId => {
                updateTextCase(
                    slideId, editor.selection.selectedObjectId!, newTextCase);
            });
            setTextCase(newTextCase);
        }
    };

    // Настройки градиента
    const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
    const [gradientDirection, setGradientDirection] = useState<string>('to right');
    const [gradientStartColor, setGradientStartColor] = useState<string>('#ffffff');
    const [gradientEndColor, setGradientEndColor] = useState<string>('#000000');
    const [gradientRadialShape, setGradientRadialShape] = useState<'circle' | 'ellipse'>('circle');
    const [gradientRadialPosition, setGradientRadialPosition] = useState<{ x: string; y: string; }>({ x: '50%', y: '50%' });

    // Обработчики изображений
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

    const onChangeTextBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newBackgroundColor = e.target.value;
        if (selection.selectedSlideIds.length > 0 && selection.selectedObjectId) {
            setTextBackground(newBackgroundColor);
            selection.selectedSlideIds.forEach(slideId => {
                updateTextBackground(
                    slideId,
                    selection.selectedObjectId!,
                    newBackgroundColor
                );
            });
        }
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

    // Обработчики Undo/Redo
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

    // Обработчики клавиш
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

    // Обработчики Unsplash
    const handleImportFromUnsplash = () => {
        if (imageSearchQuery.trim()) {
            fetchImages(imageSearchQuery);
        }
    };

    const handleSearchBackgrounds = () => {
        if (backgroundSearchQuery.trim()) {
            fetchBackgrounds(backgroundSearchQuery);
        }
    };

    // Обработчики экспорта/импорта
    const handleExport = () => {
        exportToJson(editor);
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            importFromJson(file, setEditor);
        }
    };

    // Обработчики PDF
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

    // Обработчик изменения градиента
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

    // Эффект для обновления настроек текста
    useEffect(() => {
        if (selection.selectedObject?.type === 'text') {
            const textElement = selection.selectedObject as TextContent;
            setFontFamily(textElement.fontFamily || fontFamilies[0]);
            setFontSize(textElement.fontSize || 12);
            setFontColor(textElement.fontColor || '#000000');
            setTextAlign(textElement.textAlign || 'left');
            setIsBold(textElement.fontWeight === 'bold');
            setIsItalic(textElement.fontStyle === 'italic');
            setisDecoration(textElement.textDecoration === 'underline');
            setTextCase(textElement.textCase || 'none');
            setTextBackground(textElement.backgroundColor || 'transparent')
        }
    }, [selection.selectedObject]);

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
                )}{activeSection === 'background' && (
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
                            onClick={() => setIsBackgroundModalOpen(true)}
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
                        )}{isBackgroundModalOpen && (
                            <div className={styles.modalOverlay}>
                                <div className={styles.modalContent}>
                                    <div className={styles.modalHeader}>
                                        <h2>Выберите фоновое изображение из Unsplash</h2>
                                        <button
                                            className={styles.closeButton}
                                            onClick={() => setIsBackgroundModalOpen(false)}
                                        >
                                            Закрыть
                                        </button>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Введите запрос для поиска фона..."
                                            value={backgroundSearchQuery}
                                            onChange={(e) => setBackgroundSearchQuery(e.target.value)}
                                            className={styles.unsplashInput}
                                        />
                                        <button
                                            className={styles.button}
                                            onClick={handleSearchBackgrounds}
                                            disabled={backgroundsLoading}
                                        >
                                            {backgroundsLoading ? 'Загрузка...' : 'Найти'}
                                        </button>
                                    </div>
                                    {backgroundsError && (
                                        <div className={styles.errorMessage}>{backgroundsError}</div>
                                    )}
                                    <div className={styles.imageGrid}>
                                        {backgrounds.map((imgSrc, index) => (
                                            <img
                                                key={index}
                                                src={imgSrc}
                                                alt={`Unsplash Background ${index}`}
                                                className={styles.imageItem}
                                                onClick={() => {
                                                    changeBackground({
                                                        type: 'image',
                                                        value: imgSrc
                                                    });
                                                    setIsBackgroundModalOpen(false);
                                                }}
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

                        <button
                            className={`${styles.toolButton} ${isBold ? styles.active : ''}`}
                            onClick={handleFontWeight}
                            title="Жирный"
                            disabled={!isTextSelected || isEmptyPresentation}
                        >
                            <img src={fontWeightIcon} alt="Жирный" />
                        </button>

                        <button
                            className={`${styles.toolButton} ${isItalic ? styles.active : ''}`}
                            onClick={handleFontStyle}
                            title="Курсив"
                            disabled={!isTextSelected || isEmptyPresentation}
                        >
                            <img src={fontStyleIcon} alt="Курсив" />
                        </button>

                        <button
                            className={`${styles.toolButton} ${isDecoration ? styles.active : ''}`}
                            onClick={handleTextDecoration}
                            title="Подчёркивание"
                            disabled={!isTextSelected || isEmptyPresentation}
                        >
                            <img src={textDecorationIcon} alt="Подчёркивание" />
                        </button>
                        <div className={styles.dropdownContainer}>
                            <button
                                className={`${styles.toolButton} ${isTextCaseDropdownOpen ? styles.active : ''}`}
                                onClick={() => setIsTextCaseDropdownOpen(!isTextCaseDropdownOpen)}
                                title="Регистр"
                                disabled={!isTextSelected || isEmptyPresentation}
                            >
                                <img src={textCaseIcon} alt="Регистр" />
                            </button>

                            {isTextCaseDropdownOpen && (
                                <div className={styles.dropdownMenu}>
                                    <button
                                        className={`${styles.dropdownItem} ${textCase === 'capitalize' ? styles.active : ''}`}
                                        onClick={() => {
                                            handleTextCase('capitalize');
                                            setIsTextCaseDropdownOpen(false);
                                        }}
                                    >
                                        Как в предложениях
                                    </button>
                                    <button
                                        className={`${styles.dropdownItem} ${textCase === 'uppercase' ? styles.active : ''}`}
                                        onClick={() => {
                                            handleTextCase('uppercase');
                                            setIsTextCaseDropdownOpen(false);
                                        }}
                                    >
                                        ВСЕ ПРОПИСНЫЕ
                                    </button>
                                    <button
                                        className={`${styles.dropdownItem} ${textCase === 'lowercase' ? styles.active : ''}`}
                                        onClick={() => {
                                            handleTextCase('lowercase');
                                            setIsTextCaseDropdownOpen(false);
                                        }}
                                    >
                                        все строчные
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className={styles.toolbarGroup}>
                            <button
                                className={`${styles.toolButton} ${textAlign === 'left' ? styles.active : ''}`}
                                onClick={() => handleTextAlign('left')}
                                title="По левому краю"
                                disabled={!isTextSelected || isEmptyPresentation}
                            >
                                <img src={alignLeftIcon} alt="По левому краю" />
                            </button>
                            <button
                                className={`${styles.toolButton} ${textAlign === 'center' ? styles.active : ''}`}
                                onClick={() => handleTextAlign('center')}
                                title="По центру"
                                disabled={!isTextSelected || isEmptyPresentation}
                            >
                                <img src={alignCenterIcon} alt="По центру" />
                            </button>
                            <button
                                className={`${styles.toolButton} ${textAlign === 'right' ? styles.active : ''}`}
                                onClick={() => handleTextAlign('right')}
                                title="По правому краю"
                                disabled={!isTextSelected || isEmptyPresentation}
                            >
                                <img src={alignRightIcon} alt="По правому краю" />
                            </button>
                        </div>
                        <div className={styles.toolButton} title="Цвет выделения текста">
                            <input
                                type="color"
                                value={backgroundColor}
                                onChange={onChangeTextBackground}
                                className={styles.colorPicker}
                                disabled={!isTextSelected || isEmptyPresentation}
                            />
                        </div>
                    </div>
                )}{activeSection === 'images' && (
                    <div className={styles.sectionContent}>
                        <div className={styles.toolButton} title="Добавить изображение с компьютера">
                            <input
                                type="file"
                                disabled={isEmptyPresentation}
                                id="imageUploader"
                                accept="image/*"
                                onChange={onChangeImgUpload}
                                className={styles.imageUploader}
                            />
                            <label htmlFor="imageUploader">
                                <img src={addImageIcon} alt="Добавить изображение" />
                            </label>
                        </div>
                        <button
                            className={styles.toolButton}
                            title="Добавить изображение из Unsplash"
                            disabled={isEmptyPresentation}
                            onClick={() => setIsImageModalOpen(true)}
                        >
                            <img src={unsplashIcon} alt="Unsplash" />
                        </button>
                        <button
                            className={styles.toolButton}
                            title="Удалить изображение"
                            onClick={removeObject}
                            disabled={!isImageSelected}
                        >
                            <img src={removeIcon} alt="Удалить изображение" />
                        </button>
                    </div>
                )}

                {isImageModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h2>Выберите изображение из Unsplash</h2>
                                <button
                                    className={styles.closeButton}
                                    onClick={() => setIsImageModalOpen(false)}
                                >
                                    Закрыть
                                </button>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Введите запрос для поиска..."
                                    value={imageSearchQuery}
                                    onChange={(e) => setImageSearchQuery(e.target.value)}
                                    className={styles.unsplashInput}
                                />
                                <button
                                    className={styles.button}
                                    onClick={handleImportFromUnsplash}
                                    disabled={imagesLoading}
                                >
                                    {imagesLoading ? 'Загрузка...' : 'Найти'}
                                </button>
                            </div>
                            {imagesError && (
                                <div className={styles.errorMessage}>{imagesError}</div>
                            )}
                            <div className={styles.imageGrid}>
                                {images.map((imgSrc, index) => (
                                    <img
                                        key={index}
                                        src={imgSrc}
                                        alt={`Unsplash ${index}`}
                                        className={styles.imageItem}
                                        onClick={() => {
                                            addImage({ src: imgSrc });
                                            setIsImageModalOpen(false);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export { Toolbar };