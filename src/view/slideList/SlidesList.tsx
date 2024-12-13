import styles from './SlidesList.module.css';
import { SlidesCollection } from "../../store/Editor/PresentationType";
import { CurrentSlide } from '../slide/currentSlide';
import { SelectionType } from "../../store/Editor/EditorType";
import { dispatch } from "../../store/Editor/editor";
import { setSelection } from "../../store/Editor/SetSelection";
import { changeSlidePosition } from '../../store/ChangeSlidePosition';
import { useDragAndDrop } from '../../store/СustomHooks/useDragAndDropForSlide';

const SLIDE_PREVIEW_SCALE = 0.2;

type SlidesListProps = {
    slides: SlidesCollection,
    selection: SelectionType,
}

function SlidesList({ slides, selection }: SlidesListProps) {
    function onSlideClick(slideId: string) {
        dispatch(setSelection, {
            selectedSlideId: slideId,
        });
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
                        className={styles.slideContainer}
                        draggable
                        onClick={() => onSlideClick(slide.id)}
                        onDragStart={(event) => onDragStart(event, slide.id)}
                        onDragOver={onDragOver}
                        onDrop={(event) => onDrop(event, slide.id)}
                        onDragEnd={onDragEnd}
                    >
                        <div className={styles.slideNumber}>{slides.findIndex(s => s.id === slide.id) + 1}</div>
                        <CurrentSlide
                            slide={slide}
                            scale={SLIDE_PREVIEW_SCALE}
                            isSelected={slide.id === selection.selectedSlideId}
                            className={styles.item}
                            //selectedObjId={selection?.selectedObjectId}
                            selectedObjId={null}
                            showResizeHandles={false}
                        />
                    </div>
                ))
            )}
        </div>
    );
}

export { SlidesList };