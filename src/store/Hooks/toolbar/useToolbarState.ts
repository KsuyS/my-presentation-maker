import { useState } from 'react';
import { useAppSelector } from '../useAppSelector';

export const useToolbarState = () => {
    const [activeSection, setActiveSection] = useState('main');
    const [isGradientVisible, setIsGradientVisible] = useState(false);
    const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [imageSearchQuery, setImageSearchQuery] = useState('');
    const [backgroundSearchQuery, setBackgroundSearchQuery] = useState('');
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);

    const editor = useAppSelector((editor) => editor);
    const images = useAppSelector(state => state.unsplash?.images?.data ?? []);
    const backgrounds = useAppSelector(state => state.unsplash?.backgrounds?.data ?? []);

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

    return {
        activeSection,
        setActiveSection,
        isGradientVisible,
        setIsGradientVisible,
        isBackgroundModalOpen,
        setIsBackgroundModalOpen,
        isImageModalOpen,
        setIsImageModalOpen,
        imageSearchQuery,
        setImageSearchQuery,
        backgroundSearchQuery,
        setBackgroundSearchQuery,
        pdfPreviewUrl,
        setPdfPreviewUrl,
        editor,
        images,
        backgrounds,
        selection
    };
};