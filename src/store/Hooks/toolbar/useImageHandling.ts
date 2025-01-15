import { useState, useCallback } from 'react';
import { useAppActions } from '../useAppActions';

export const useImageHandling = () => {
    const { addImage, updateImageBorderStyle, fetchImages, changeBackground } = useAppActions();
    const [imageSearchQuery, setImageSearchQuery] = useState('');

    // Обработка загрузки изображения
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

    // Обработка загрузки фонового изображения
    const handleBackgroundImageUpload = useCallback((file: File) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result && typeof reader.result === 'string') {
                    changeBackground({ type: 'image', value: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    }, [changeBackground]);

    // Обработка стилей рамки
    const handleBorderStyle = useCallback((
        slideId: string,
        objectId: string,
        borderStyle: 'none' | 'black-thick' | 'black-thin' | 'white-thick' | 'white-thin' | 'rounded-oval' | 'rounded-rect'
    ) => {
        updateImageBorderStyle(slideId, objectId, borderStyle);
    }, [updateImageBorderStyle]);

    // Поиск изображений в Unsplash
    const handleUnsplashSearch = useCallback(() => {
        if (imageSearchQuery.trim()) {
            fetchImages(imageSearchQuery);
        }
    }, [imageSearchQuery, fetchImages]);

    return {
        imageSearchQuery,
        setImageSearchQuery,
        handleImageUpload,
        handleBackgroundImageUpload,
        handleBorderStyle,
        handleUnsplashSearch
    };
};