import React from 'react';
import styles from '../../Toolbar.module.css';
import addTextIcon from '../../../../assets/add-text.png';
import removeIcon from '../../../../assets/delete.png';
import alignLeftIcon from '../../../../assets/leftAlign.png';
import alignCenterIcon from '../../../../assets/centerAlign.png';
import alignRightIcon from '../../../../assets/rightAlign.png';
import fontWeightIcon from '../../../../assets/bold.png';
import fontStyleIcon from '../../../../assets/italic.png';
import textDecorationIcon from '../../../../assets/decoration.png';
import textCaseIcon from '../../../../assets/case.png';

interface TextSectionProps {
    textFormatting: {
        fontFamily: string;
        fontSize: number;
        fontColor: string;
        textAlign: 'left' | 'center' | 'right';
        isBold: boolean;
        isItalic: boolean;
        isDecoration: boolean;
        textCase: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
        handleFontFamilyChange: (slideId: string, objectId: string, value: string) => void;
        handleFontSizeChange: (slideId: string, objectId: string, value: number) => void;
        handleFontColorChange: (slideId: string, objectId: string, value: string) => void;
        handleTextAlignChange: (slideId: string, objectId: string, value: 'left' | 'center' | 'right') => void;
        handleFontWeightChange: (slideId: string, objectId: string) => void;
        handleFontStyleChange: (slideId: string, objectId: string) => void;
        handleTextDecorationChange: (slideId: string, objectId: string) => void;
        handleTextCaseChange: (slideId: string, objectId: string, value: 'none' | 'capitalize' | 'uppercase' | 'lowercase') => void;
    };
    actions: {
        addText: () => void;
        removeObject: () => void;
    };
    selection: {
        selectedSlideIds: string[];
        selectedObjectId: string | null;
        selectedObject: any;
    };
    isEmptyPresentation: boolean;
}

export const TextSection: React.FC<TextSectionProps> = ({
    textFormatting,
    actions,
    selection,
    isEmptyPresentation
}) => {
    const isTextSelected = selection.selectedObject?.type === 'text';
    const [isTextCaseDropdownOpen, setIsTextCaseDropdownOpen] = React.useState(false);
    const fontFamilies = ['Arial', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia'];
    const fontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40];

    return (
        <div className={styles.sectionContent}>
            <button
                className={styles.toolButton}
                title="Добавить текст"
                onClick={actions.addText}
                disabled={isEmptyPresentation}
            >
                <img src={addTextIcon} alt="Добавить текст" />
            </button>

            <button
                className={styles.toolButton}
                title="Удалить текст"
                onClick={actions.removeObject}
                disabled={!isTextSelected || isEmptyPresentation}
            >
                <img src={removeIcon} alt="Удалить текст" />
            </button>

            <select
                className={`${styles.toolButton} ${styles.toolBtn}`}
                title="Шрифт"
                value={textFormatting.fontFamily}
                onChange={(e) => textFormatting.handleFontFamilyChange(
                    selection.selectedSlideIds[0],
                    selection.selectedObjectId!,
                    e.target.value
                )}
                disabled={!isTextSelected || isEmptyPresentation}
            >
                {fontFamilies.map((family) => (
                    <option key={family} value={family}>{family}</option>
                ))}
            </select>

            <select
                className={`${styles.toolButton} ${styles.toolBtn}`}
                title="Размер шрифта"
                value={textFormatting.fontSize}
                onChange={(e) => textFormatting.handleFontSizeChange(
                    selection.selectedSlideIds[0],
                    selection.selectedObjectId!,
                    parseInt(e.target.value, 10)
                )}
                disabled={!isTextSelected || isEmptyPresentation}
            >
                {fontSizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                ))}
            </select>

            <div className={styles.toolButton} title="Цвет текста">
                <input
                    type="color"
                    value={textFormatting.fontColor}
                    onChange={(e) => textFormatting.handleFontColorChange(
                        selection.selectedSlideIds[0],
                        selection.selectedObjectId!,
                        e.target.value
                    )}
                    className={styles.colorPicker}
                    disabled={!isTextSelected || isEmptyPresentation}
                />
            </div>

            <div className={styles.toolbarGroup}>
                <button
                    className={`${styles.toolButton} ${textFormatting.textAlign === 'left' ? styles.active : ''}`}
                    onClick={() => textFormatting.handleTextAlignChange(
                        selection.selectedSlideIds[0],
                        selection.selectedObjectId!,
                        'left'
                    )}
                    title="По левому краю"
                    disabled={!isTextSelected || isEmptyPresentation}
                >
                    <img src={alignLeftIcon} alt="По левому краю" />
                </button>

                <button
                    className={`${styles.toolButton} ${textFormatting.textAlign === 'center' ? styles.active : ''}`}
                    onClick={() => textFormatting.handleTextAlignChange(
                        selection.selectedSlideIds[0],
                        selection.selectedObjectId!,
                        'center'
                    )}
                    title="По центру"
                    disabled={!isTextSelected || isEmptyPresentation}
                >
                    <img src={alignCenterIcon} alt="По центру" />
                </button>

                <button
                    className={`${styles.toolButton} ${textFormatting.textAlign === 'right' ? styles.active : ''}`}
                    onClick={() => textFormatting.handleTextAlignChange(
                        selection.selectedSlideIds[0],
                        selection.selectedObjectId!,
                        'right'
                    )}
                    title="По правому краю"
                    disabled={!isTextSelected || isEmptyPresentation}
                >
                    <img src={alignRightIcon} alt="По правому краю" />
                </button>
            </div>

            <button
                className={`${styles.toolButton} ${textFormatting.isBold ? styles.active : ''}`}
                onClick={() => textFormatting.handleFontWeightChange(
                    selection.selectedSlideIds[0],
                    selection.selectedObjectId!
                )}
                title="Жирный"
                disabled={!isTextSelected || isEmptyPresentation}
            >
                <img src={fontWeightIcon} alt="Жирный" />
            </button>

            <button
                className={`${styles.toolButton} ${textFormatting.isItalic ? styles.active : ''}`}
                onClick={() => textFormatting.handleFontStyleChange(
                    selection.selectedSlideIds[0],
                    selection.selectedObjectId!
                )}
                title="Курсив"
                disabled={!isTextSelected || isEmptyPresentation}
            >
                <img src={fontStyleIcon} alt="Курсив" />
            </button>

            <button
                className={`${styles.toolButton} ${textFormatting.isDecoration ? styles.active : ''}`}
                onClick={() => textFormatting.handleTextDecorationChange(
                    selection.selectedSlideIds[0],
                    selection.selectedObjectId!
                )}
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
                        {[
                            { value: 'none', label: 'Как есть' },
                            { value: 'capitalize', label: 'Начинать С Прописных' },
                            { value: 'uppercase', label: 'ВСЕ ПРОПИСНЫЕ' },
                            { value: 'lowercase', label: 'все строчные' }
                        ].map(option => (
                            <button
                                key={option.value}
                                className={`${styles.dropdownItem} ${textFormatting.textCase === option.value ? styles.active : ''}`}
                                onClick={() => {
                                    textFormatting.handleTextCaseChange(
                                        selection.selectedSlideIds[0],
                                        selection.selectedObjectId!,
                                        option.value as any
                                    );
                                    setIsTextCaseDropdownOpen(false);
                                }}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};