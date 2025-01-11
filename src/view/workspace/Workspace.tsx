import { Slide } from "../../store/PresentationType";
import { useAppSelector } from "../../store/Hooks/useAppSelector";
import { CurrentSlide } from '../slide/currentSlide'
import styles from './Workspace.module.css'
import { useAppActions } from "../../store/Hooks/useAppActions";
import { useEffect } from "react";

function Workspace() {
    const editor = useAppSelector((editor => editor))
    const slides = editor.presentation.slides
    const selection = editor.selection
    const selectedSlideId = selection?.selectedSlideIds?.[0];
    const { setSelection } = useAppActions();

    useEffect(() => {
        if (!selectedSlideId && slides.length > 0) {
            setSelection({ selectedSlideIds: [slides[0].id], selectedObjectId: null });
        }
    }, [slides, selectedSlideId, setSelection]);

    const selectedSlide: Slide | undefined = slides.find(slide => slide.id === selectedSlideId);


    return (
        <div className={styles.workspace}>
            {selectedSlide && <CurrentSlide slide={selectedSlide} className={styles.currentSlide}></CurrentSlide>}
        </div>
    )
}

export {
    Workspace,
}