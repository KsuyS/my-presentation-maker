import React from 'react';
import styles from '../../Toolbar.module.css';
import backgroundIcon from '../../../../assets/background.png';
import backgroundUnsplashIcon from '../../../../assets/backgroundUnsplash.png';
import gradientIcon from '../../../../assets/gradient.png';

interface BackgroundSectionProps {
    imageHandling: {
        handleBackgroundImageUpload: (file: File) => void;
        handleBackgroundModalOpen: () => void;
    };
    gradientHandling: {
        isGradientVisible: boolean;
        toggleGradientVisibility: () => void;
        gradientControls: React.ReactNode;
    };
    isEmptyPresentation: boolean;
    onColorChange: (color: string) => void;
}

export const BackgroundSection: React.FC<BackgroundSectionProps> = ({
    imageHandling,
    gradientHandling,
    isEmptyPresentation,
    onColorChange
}) => {
    return (
        <div className={styles.sectionContent}>
            <div className={styles.toolButton} title="Цвет">
                <input
                    type="color"
                    onChange={(e) => onColorChange(e.target.value)}
                    className={styles.colorPicker}
                    disabled={isEmptyPresentation}
                />
            </div>

            <button
                className={styles.toolButton}
                disabled={isEmptyPresentation}
                title="Градиент"
                onClick={gradientHandling.toggleGradientVisibility}
            >
                <img src={gradientIcon} alt="Градиент" />
            </button>

            <div className={styles.toolButton} title="Изображение с компьютера">
                <input
                    type="file"
                    id="bgImageUploader"
                    accept="image/*"
                    onChange={(e) => e.target.files && imageHandling.handleBackgroundImageUpload(e.target.files[0])}
                    className={styles.imageUploader}
                    disabled={isEmptyPresentation}
                />
                <label htmlFor="bgImageUploader">
                    <img src={backgroundIcon} alt="Изображение с компьютера" />
                </label>
            </div>

            <button
                className={styles.toolButton}
                disabled={isEmptyPresentation}
                title="Изображение из Unsplash"
                onClick={imageHandling.handleBackgroundModalOpen}
            >
                <img src={backgroundUnsplashIcon} alt="Изображение из Unsplash" />
            </button>

            {gradientHandling.isGradientVisible && gradientHandling.gradientControls}
        </div>
    );
};