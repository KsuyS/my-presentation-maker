import React from 'react';
import styles from '../../Toolbar.module.css';

interface BackgroundModalProps {
    isOpen: boolean;
    onClose: () => void;
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
    onSearch: () => void;
    backgrounds: string[];
    onBackgroundSelect: (background: string) => void;
    isLoading: boolean;
    error: string | null;
}

export const BackgroundModal: React.FC<BackgroundModalProps> = ({
    isOpen,
    onClose,
    searchQuery,
    onSearchQueryChange,
    onSearch,
    backgrounds,
    onBackgroundSelect,
    isLoading,
    error
}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Выберите фоновое изображение из Unsplash</h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                    >
                        Закрыть
                    </button>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Введите запрос для поиска фона..."
                        value={searchQuery}
                        onChange={(e) => onSearchQueryChange(e.target.value)}
                        className={styles.unsplashInput}
                    />
                    <button
                        className={styles.button}
                        onClick={onSearch}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Загрузка...' : 'Найти'}
                    </button></div>
                {error && (
                    <div className={styles.errorMessage}>{error}</div>
                )}
                <div className={styles.imageGrid}>
                    {backgrounds.map((imgSrc, index) => (
                        <img
                            key={index}
                            src={imgSrc}
                            alt={`Unsplash Background ${index}`}
                            className={styles.imageItem}
                            onClick={() => onBackgroundSelect(imgSrc)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};