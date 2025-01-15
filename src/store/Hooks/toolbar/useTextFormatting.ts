import { useState, useCallback } from 'react';
import { useAppActions } from '../useAppActions';

export const useTextFormatting = () => {
    const {
        updateFontSize,
        updateFontFamily,
        updateFontColor,
        updateTextAlign,
        updateFontWeight,
        updateFontStyle,
        updateTextDecoration,
        updateTextCase
    } = useAppActions();

    // Состояния для текстового форматирования
    const [fontFamily, setFontFamily] = useState('Arial');
    const [fontSize, setFontSize] = useState(12);
    const [fontColor, setFontColor] = useState('#000000');
    const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isDecoration, setIsDecoration] = useState(false);
    const [textCase, setTextCase] = useState<'none' | 'capitalize' | 'uppercase' | 'lowercase'>('none');

    // Обработчики форматирования текста
    const handleFontFamilyChange = useCallback((
        slideId: string,
        objectId: string,
        newFontFamily: string
    ) => {
        setFontFamily(newFontFamily);
        updateFontFamily({ slideId, objectId, fontFamily: newFontFamily });
    }, [updateFontFamily]);

    const handleFontSizeChange = useCallback((
        slideId: string,
        objectId: string,
        newFontSize: number
    ) => {
        setFontSize(newFontSize);
        updateFontSize({ slideId, objectId, fontSize: newFontSize });
    }, [updateFontSize]);

    const handleFontColorChange = useCallback((
        slideId: string,
        objectId: string,
        newFontColor: string
    ) => {
        setFontColor(newFontColor);
        updateFontColor({ slideId, objectId, fontColor: newFontColor });
    }, [updateFontColor]);

    const handleTextAlignChange = useCallback((
        slideId: string,
        objectId: string,
        newTextAlign: 'left' | 'center' | 'right'
    ) => {
        setTextAlign(newTextAlign);
        updateTextAlign(slideId, objectId, newTextAlign);
    }, [updateTextAlign]);

    const handleFontWeightChange = useCallback((
        slideId: string,
        objectId: string
    ) => {
        const newFontWeight = isBold ? 'normal' : 'bold';
        setIsBold(!isBold);
        updateFontWeight(slideId, objectId, newFontWeight);
    }, [isBold, updateFontWeight]);

    const handleFontStyleChange = useCallback((
        slideId: string,
        objectId: string
    ) => {
        const newFontStyle = isItalic ? 'normal' : 'italic';
        setIsItalic(!isItalic);
        updateFontStyle(slideId, objectId, newFontStyle);
    }, [isItalic, updateFontStyle]);

    const handleTextDecorationChange = useCallback((
        slideId: string,
        objectId: string
    ) => {
        const newTextDecoration = isDecoration ? 'none' : 'underline';
        setIsDecoration(!isDecoration);
        updateTextDecoration(slideId, objectId, newTextDecoration);
    }, [isDecoration, updateTextDecoration]);

    const handleTextCaseChange = useCallback((
        slideId: string,
        objectId: string,
        newTextCase: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
    ) => {
        setTextCase(newTextCase);
        updateTextCase(slideId, objectId, newTextCase);
    }, [updateTextCase]);

    return {
        fontFamily,
        fontSize,
        fontColor,
        textAlign,
        isBold,
        isItalic,
        isDecoration,
        textCase,
        handleFontFamilyChange,
        handleFontSizeChange,
        handleFontColorChange,
        handleTextAlignChange,
        handleFontWeightChange,
        handleFontStyleChange,
        handleTextDecorationChange,
        handleTextCaseChange
    };
};