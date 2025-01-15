import { useAppActions } from '../useAppActions';
import { useCallback } from 'react';
import { generatePdfDataUrl, exportToPdf } from '../../../utils/ExportToPdf';
import { exportToJson, importFromJson } from '../../../utils/jsonUtils';
import { EditorType } from '../../EditorType';

export const useToolbarActions = (editor: EditorType) => {
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
        updateImageBorderStyle
    } = useAppActions();

    // Обработчики файлов
    const handleExport = useCallback(() => {
        exportToJson(editor);
    }, [editor]);

    const handleImport = useCallback((file: File) => {
        if (file) {
            importFromJson(file, setEditor);
        }
    }, [setEditor]);

    // Обработчики PDF
    const handlePreviewPdf = async () => {
        try {
            const dataUrl = await generatePdfDataUrl(editor);
            return dataUrl;
        } catch (error) {
            console.error("Error generating PDF preview:", error);
            return null;
        }
    };

    const handleSavePdf = useCallback(() => {
        exportToPdf(editor);
    }, [editor]);

    // Обработчики изображений
    const handleImageUpload = useCallback((file: File) => {
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
    }, [addImage]);

    // Обработчики фона
    const handleBackgroundColorChange = useCallback((color: string) => {
        changeBackground({ type: 'solid', value: color });
    }, [changeBackground]);

    const handleBackgroundImageUpload = useCallback((file: File) => {
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
    }, [changeBackground]);

    const handleGradientBackgroundChange = useCallback(({
        gradientType,
        gradientDirection,
        gradientStartColor,
        gradientEndColor,
        gradientRadialShape,
        gradientRadialPosition
    }: {
        gradientType: 'linear' | 'radial';
        gradientDirection: string;
        gradientStartColor: string;
        gradientEndColor: string;
        gradientRadialShape: 'circle' | 'ellipse';
        gradientRadialPosition: { x: string; y: string; };
    }) => {
        let value = '';
        if (gradientType === 'linear') {
            value = `linear-gradient(${gradientDirection}, ${gradientStartColor}, ${gradientEndColor})`;
        } else {
            value = `radial-gradient(${gradientRadialShape} at ${gradientRadialPosition.x} ${gradientRadialPosition.y}, ${gradientStartColor}, ${gradientEndColor})`;
        }
        changeBackground({ type: 'gradient', value });
    }, [changeBackground]);

    // Обработчики текста
    const handleTextAlign = useCallback((
        slideId: string,
        objectId: string,
        align: 'left' | 'center' | 'right'
    ) => {
        updateTextAlign(slideId, objectId, align);
    }, [updateTextAlign]);

    const handleFontWeight = useCallback((
        slideId: string,
        objectId: string,
        isBold: boolean
    ) => {
        const newFontWeight = isBold ? 'normal' : 'bold';
        updateFontWeight(slideId, objectId, newFontWeight);
    }, [updateFontWeight]);

    const handleFontStyle = useCallback((
        slideId: string,
        objectId: string,
        isItalic: boolean
    ) => {
        const newFontStyle = isItalic ? 'normal' : 'italic';
        updateFontStyle(slideId, objectId, newFontStyle);
    }, [updateFontStyle]);

    const handleTextDecoration = useCallback((
        slideId: string,
        objectId: string,
        isDecoration: boolean
    ) => {
        const newTextDecoration = isDecoration ? 'none' : 'underline';
        updateTextDecoration(slideId, objectId, newTextDecoration);
    }, [updateTextDecoration]);

    const handleTextCase = useCallback((
        slideId: string,
        objectId: string,
        newTextCase: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
    ) => {
        updateTextCase(slideId, objectId, newTextCase);
    }, [updateTextCase]);

    // Обработчики стилей изображения
    const handleImageBorderStyle = useCallback((
        slideId: string,
        objectId: string,
        borderStyle: 'none' | 'black-thick' | 'black-thin' | 'white-thick' | 'white-thin' | 'rounded-oval' | 'rounded-rect'
    ) => {
        updateImageBorderStyle(slideId, objectId, borderStyle);
    }, [updateImageBorderStyle]);

    // Обработчики Unsplash
    const handleUnsplashImageSearch = useCallback((query: string) => {
        if (query.trim()) {
            fetchImages(query);
        }
    }, [fetchImages]);

    const handleUnsplashBackgroundSearch = useCallback((query: string) => {
        if (query.trim()) {
            fetchBackgrounds(query);
        }
    }, [fetchBackgrounds]);

    return {
        // Базовые действия
        addSlide,
        removeSlide,
        addText,
        addImage,
        removeObject,
        setEditor,

        // Обработчики файлов
        handleExport,
        handleImport,

        // Обработчики PDF
        handlePreviewPdf,
        handleSavePdf,

        // Обработчики изображений
        handleImageUpload,
        handleImageBorderStyle,

        // Обработчики фона
        handleBackgroundColorChange,
        handleBackgroundImageUpload,
        handleGradientBackgroundChange,

        // Обработчики текста
        handleTextAlign,
        handleFontWeight,
        handleFontStyle,
        handleTextDecoration,
        handleTextCase,
        updateFontSize,
        updateFontFamily,
        updateFontColor,

        // Обработчики Unsplash
        handleUnsplashImageSearch,
        handleUnsplashBackgroundSearch
    };
};