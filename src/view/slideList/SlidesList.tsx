import styles from './SlidesList.module.css';
import { CurrentSlide } from '../slide/currentSlide';
import { useDragAndDropSlide } from '../../store/СustomHooks/useDragAndDropForSlide';
import { useAppSelector } from '../../store/Hooks/useAppSelector';
import { useAppActions } from '../../store/Hooks/useAppActions';

const SLIDE_PREVIEW_SCALE = 0.2;

function SlidesList() {
    const editor = useAppSelector((editor => editor))
    const slides = editor.presentation.slides
    const selection = editor.selection

    const { setSelection } = useAppActions()

    function onSlideClick(slideId: string) {
        setSelection({
            selectedSlideId: slideId,
            selectedObjectId: null,
        })
    }

    const {
        draggingSlide,
        dragOverSlide,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
    } = useDragAndDropSlide();

    return (
        <div className={styles.slideList}>
            {slides.length === 0 ? (
                <div className={styles.emptySlidesMessage}>
                </div>
            ) : (
                slides.map((slide) => (
            <div
                key={slide.id}
                draggable
                onClick={() => onSlideClick(slide.id)}
                onDragStart = {() => handleDragStart(slide.id)}
                onDragOver={(e) => handleDragOver(e, slide.id)}
                onDragEnd={handleDragEnd}
                className={`${styles.slideContainer} ${draggingSlide === slide.id ? styles.dragging : ''} ${dragOverSlide === slide.id ? styles.dragover : ''}`}
            >
                <div className={styles.slideNumber}>{slides.findIndex(s => s.id === slide.id) + 1}</div>
                <CurrentSlide
                    slide={slide}
                    scale={SLIDE_PREVIEW_SCALE}
                    selection={selection}
                    className={styles.item}
                    showResizeHandles={false}
                />
            </div>
            ))
            )}
        </div>
    );
}

export { SlidesList };