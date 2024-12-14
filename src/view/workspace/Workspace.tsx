import { Slide } from "../../store/PresentationType";
import { useAppSelector } from "../../store/Hooks/useAppSelector";
import { CurrentSlide } from '../slide/currentSlide'
import styles from './Workspace.module.css'

function Workspace() {
    const editor = useAppSelector((editor => editor))
    const slides = editor.presentation.slides
    const selection = editor.selection
    const selectedSlide: Slide = slides.find(slide => slide.id === selection?.selectedSlideId) || slides[0]

    return (
        <div className={styles.workspace}>
            <CurrentSlide slide={selectedSlide} className="{styles.currentSlide}"></CurrentSlide>
        </div>
    )
}

export {
    Workspace,
}
