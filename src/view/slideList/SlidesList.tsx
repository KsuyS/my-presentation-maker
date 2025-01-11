import styles from './SlidesList.module.css';
import { CurrentSlide } from '../slide/currentSlide';
import { useDragAndDropSlide } from '../../store/СustomHooks/useDragAndDropForSlide';
import { useAppSelector } from '../../store/Hooks/useAppSelector';
import { useAppActions } from '../../store/Hooks/useAppActions';

const SLIDE_PREVIEW_SCALE = 0.2;
const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;

function SlidesList() {
    const editor = useAppSelector((editor => editor))
    const slides = editor.presentation.slides
    const selection = editor.selection

    const { setSelection } = useAppActions()

    function onSlideClick(slideId: string, event: React.MouseEvent) {
        let newSelectedSlideIds = selection.selectedSlideIds ? [...selection.selectedSlideIds] : [];

        if (event.ctrlKey) {
            if (newSelectedSlideIds.includes(slideId)) {
                newSelectedSlideIds = newSelectedSlideIds.filter(id => id !== slideId);
            } else {
                newSelectedSlideIds.push(slideId);
            }
        } else {
            newSelectedSlideIds = [slideId]
        }
        setSelection({
            selectedSlideIds: newSelectedSlideIds,
            selectedObjectId: editor.selection.selectedObjectId,
        })
    }

    const {
        draggingSlideIds,
        dragOverSlide,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
    } = useDragAndDropSlide();

    return (
        <div className={styles.slideList}>
            {slides.length === 0 ? (
                <div className={styles.emptySlideContainer}>
                    <div style={{
                        width: `${SLIDE_WIDTH * SLIDE_PREVIEW_SCALE}px`,
                        height: `${SLIDE_HEIGHT * SLIDE_PREVIEW_SCALE}px`,
                        backgroundColor: "white",
                        border: "1px solid #545557",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "10px",
                        marginLeft: "60px",
                        fontSize: "12px"

                    }}>
                        Добавьте слайд
                    </div>
                </div>

            ) : (
                slides.map((slide) => (
                    <div
                        key={slide.id}
                        draggable
                        onClick={(event) => onSlideClick(slide.id, event)}
                        onDragStart={() => handleDragStart(slide.id)}
                        onDragOver={(e) => handleDragOver(e, slide.id)}
                        onDragEnd={handleDragEnd}
                        className={`${styles.slideContainer} ${draggingSlideIds && draggingSlideIds.includes(slide.id) ? styles.dragging : ''} ${dragOverSlide === slide.id ? styles.dragover : ''}`}
                    >
                        <div className={styles.slideNumber}>{slides.findIndex(s => s.id === slide.id) + 1}</div>
                        <CurrentSlide
                            slide={slide}
                            scale={SLIDE_PREVIEW_SCALE}
                            selection={selection}
                            className={styles.item}
                            showResizeHandles={false}
                            readOnly={true}
                        />
                    </div>
                ))
            )
            }
        </div >
    );
}

export { SlidesList };