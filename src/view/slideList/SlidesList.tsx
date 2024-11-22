import styles from './SlidesList.module.css';
import { SlidesCollection } from "../../store/PresentationType.ts";
import { CurrentSlide } from '../slide/currentSlide.tsx';
import { SelectionType } from "../../store/EditorType.ts";
import { dispatch } from "../../store/editor.ts";
import { setSelection } from "../../store/setSelection.ts";
import { changeSlidePosition } from '../../store/ChangeSlidePosition';
import { useDragAndDrop } from '../../store/useDragAndDropForSlide';

const SLIDE_PREVIEW_SCALE = 0.2;

type SlidesListProps = {
    slides: SlidesCollection,
    selection: SelectionType,
}

function SlidesList({ slides, selection }: SlidesListProps) {
    function onSlideClick(slideId: string) {
        dispatch(setSelection, {
            selectedSlideId: slideId,
            selectedObjectId: null
        });
    }

    const { onDragStart, onDragOver, onDrop, onDragEnd } = useDragAndDrop(slides, (updatedSlides) => {
        dispatch(changeSlidePosition, updatedSlides);
    });

    return (
        <div className={styles.slideList}>
            {slides.map((slide) => (
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
                        selectedObjId={null}
                    />
                </div>
            ))}
        </div>
    );
}

export { SlidesList };