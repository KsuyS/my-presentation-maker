import styles from './SlidesList.module.css';
import { SlidesCollection } from "../../store/PresentationType.ts";
import { CurrentSlide } from '../slide/currentSlide.tsx';
import { SelectionType } from "../../store/EditorType.ts";
import { dispatch } from "../../store/editor.ts";
import { setSelection } from "../../store/setSelection.ts";
import { useEffect } from "react";
import { useDragAndDropSlide } from '../../store/useDragAndDropForSlide.ts';

const SLIDE_PREVIEW_SCALE = 0.2;

type SlidesListProps = {
    slides: SlidesCollection,
    selection: SelectionType,
}

function SlidesList({ slides, selection }: SlidesListProps) {
    const { items, setItems, handleDragStart, handleDrop, handleDropping } = useDragAndDropSlide(slides.map(slide => slide.id));

    useEffect(() => {
        setItems(slides.map(slide => slide.id));
    }, [slides]);

    function onSlideClick(slideId: string) {
        dispatch(setSelection, {
            selectedSlideId: slideId,
            selectedObjectId: null
        });
    }

    return (
        <div className={styles.slideList}>
            {items.map((slideId, index) => {
                const slide = slides.find(s => s.id === slideId);
                if (!slide) return null;
                return (
                    <div
                        key={slide.id}
                        className={styles.slideContainer}
                        onClick={() => onSlideClick(slide.id)}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDropping}
                        onDrop={(e) => handleDrop(e, index)}
                    >
                        <div className={styles.slideNumber}>{index + 1}</div>
                        <CurrentSlide
                            slide={slide}
                            scale={SLIDE_PREVIEW_SCALE}
                            isSelected={slide.id === selection.selectedSlideId}
                            className={styles.item}
                            selectedObjId={null}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export {
    SlidesList,
};