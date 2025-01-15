import React from 'react';
import styles from '../../Toolbar.module.css';
import addImageIcon from '../../../../assets/add-image.png';
import removeIcon from '../../../../assets/delete.png';
import unsplashIcon from '../../../../assets/unsplash.png';
import borderStyleIcon from '../../../../assets/border-style.png';

interface ImagesSectionProps {
    imageHandling: {
        handleImageUpload: (file: File) => void;
        handleImageModalOpen: () => void;
        handleBorderStyleChange: (
            slideId: string,
            objectId: string,
            style: 'none' | 'black-thick' | 'black-thin' | 'white-thick' | 'white-thin' | 'rounded-oval' | 'rounded-rect'
        ) => void;
    };
    selection: {
        selectedSlideIds: string[];
        selectedObjectId: string | null;
        selectedObject: any;
    };
    isEmptyPresentation: boolean;
}

export const ImagesSection: React.FC<ImagesSectionProps> = ({
    imageHandling,
    selection,
    isEmptyPresentation
}) => {
    const [isBorderStyleDropdownOpen, setIsBorderStyleDropdownOpen] = React.useState(false);
    const isImageSelected = selection.selectedObject?.type === 'image';

    const borderStyles = [
        { value: 'none', label: 'Без рамки' },
        { value: 'black-thick', label: 'Широкая черная рамка' },
        { value: 'black-thin', label: 'Простая черная рамка' },
        { value: 'white-thick', label: 'Широкая белая рамка' },
        { value: 'white-thin', label: 'Простая белая рамка' },
        { value: 'rounded-oval', label: 'Овальная рамка' },
        { value: 'rounded-rect', label: 'Прямоугольник со сглаженными краями' },
    ];

    return (
        <div className={styles.sectionContent}>
            <div className={styles.toolButton} title="Добавить изображение с компьютера">
                <input
                    type="file"
                    id="imageUploader"
                    accept="image/*"
                    onChange={(e) => e.target.files && imageHandling.handleImageUpload(e.target.files[0])}
                    className={styles.imageUploader}
                    disabled={isEmptyPresentation}
                />
                <label htmlFor="imageUploader">
                    <img src={addImageIcon} alt="Добавить изображение" />
                </label>
            </div>

            <button
                className={styles.toolButton}
                title="Добавить изображение из Unsplash"
                disabled={isEmptyPresentation}
                onClick={imageHandling.handleImageModalOpen}
            >
                <img src={unsplashIcon} alt="Unsplash" />
            </button>

            <button
                className={styles.toolButton}
                title="Удалить изображение"
                onClick={() => { }}  // Добавить обработчик удаления
                disabled={!isImageSelected || isEmptyPresentation}
            >
                <img src={removeIcon} alt="Удалить изображение" />
            </button>

            <div className={styles.dropdownContainer}>
                <button
                    className={`${styles.toolButton} ${isBorderStyleDropdownOpen ? styles.active : ''}`}
                    onClick={() => setIsBorderStyleDropdownOpen(!isBorderStyleDropdownOpen)}
                    title="Стиль рамки"
                    disabled={!isImageSelected || isEmptyPresentation}
                >
                    <img src={borderStyleIcon} alt="Стиль рамки" />
                </button>

                {isBorderStyleDropdownOpen && (
                    <div className={styles.dropdownMenu}>
                        {borderStyles.map((style) => (
                            <button
                                key={style.value}
                                className={`${styles.dropdownItem} ${selection.selectedObject?.borderStyle === style.value ? styles.active : ''
                                    }`}
                                onClick={() => {
                                    imageHandling.handleBorderStyleChange(
                                        selection.selectedSlideIds[0],
                                        selection.selectedObjectId!,
                                        style.value as any
                                    );
                                    setIsBorderStyleDropdownOpen(false);
                                }}
                            >
                                {style.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};