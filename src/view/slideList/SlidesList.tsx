import { SlidesCollection } from "../../store/PresentationType.ts";
import { CurrentSlide } from '../slide/currentSlide.tsx'
import styles from './SlidesList.module.css'
import { SelectionType } from "../../store/EditorType.ts";
import { dispatch } from "../../store/editor.ts";
import { setSelection } from "../../store/setSelection.ts";

const SLIDE_PREVIEW_SCALE = 0.2

type SlidesListPros = {
    slides: SlidesCollection,
    selection: SelectionType,
}

function SlidesList({ slides, selection }: SlidesListPros) {
    function onSlideClick(slideId: string) {
        dispatch(setSelection, {
            selectedSlideId: slideId,
        })
    }
    return (
        <div className={styles.slideList}>
            {slides.map((slide, index) =>
                <div key={slide.id} className={styles.slideContainer} onClick={() => onSlideClick(slide.id)}>
                     <div className={styles.slideNumber}>{index + 1}</div> 
                    <CurrentSlide
                        slide={slide}
                        scale={SLIDE_PREVIEW_SCALE}
                        isSelected={slide.id == selection.selectedSlideId}
                        className={styles.item}
                        selectedObjId = {selection.selectedObjectId}
                    ></CurrentSlide>
                </div>
            )}
        </div>
    )
}

export {
    SlidesList,
}
