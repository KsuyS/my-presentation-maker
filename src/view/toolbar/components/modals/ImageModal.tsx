import React from 'react';
import styles from '../../Toolbar.module.css';

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
    onSearch: () => void;
    images: string[];
    onImageSelect: (image: string) => void;
    isLoading: boolean;
    error: string | null;
}

export const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    onClose,
    searchQuery,
    onSearchQueryChange,
    onSearch,
    images,
    onImageSelect,
    isLoading,
    error
}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Выберите изображение из Unsplash</h2>
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
                        placeholder="Введите запрос для поиска..."
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
                    </button>
                </div>
                {error && (
                    <div className={styles.errorMessage}>{error}</div>
                )}
                <div className={styles.imageGrid}>
                    {images.map((imgSrc, index) => (
                        <img
                            key={index}
                            src={imgSrc}
                            alt={`Unsplash ${index}`}
                            className={styles.imageItem}
                            onClick={() => onImageSelect(imgSrc)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};