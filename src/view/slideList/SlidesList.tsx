import styles from './SlidesList.module.css';
import { CurrentSlide } from '../slide/currentSlide';
import { dispatch } from '../../store/editor';
import { changeSlidePosition } from '../../store/function/ChangeSlidePosition';
import { useDragAndDrop } from '../../store/СustomHooks/useDragAndDropForSlide';
import { useAppSelector } from '../../store/Hooks/useAppSelector';
import { useAppActions } from '../../store/Hooks/useAppActions';

const SLIDE_PREVIEW_SCALE = 0.2;

function SlidesList() {
    const editor = useAppSelector((editor => editor))
    const slides = editor.presentation.slides
    const selection = editor.selection
    const {setSelection} = useAppActions()

    function onSlideClick(slideId: string) {
        setSelection({
            selectedSlideId: slideId,
            selectedObjectId:null,
        })
    }

    const { onDragStart, onDragOver, onDrop, onDragEnd } = useDragAndDrop(slides, (updatedSlides) => {
        dispatch(changeSlidePosition, updatedSlides);
    });

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
                        onDragStart={(event) => onDragStart(event, slide.id)}
                        onDragOver={onDragOver}
                        onDrop={(event) => onDrop(event, slide.id)}
                        onDragEnd={onDragEnd}
                        className={styles.slideContainer}
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