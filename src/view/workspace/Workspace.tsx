import {Slide} from "../../store/Editor/PresentationType";
import { CurrentSlide } from '../slide/currentSlide'

import styles from './Workspace.module.css'

type WorkspaceProps = {
    slide: Slide | null,
    selectedObjId: string | null
}

function Workspace({slide, selectedObjId}: WorkspaceProps) {
    return (
        <div className={styles.workspace} key={slide?.id}>
            <CurrentSlide slide={slide} isSelected={false} className={styles.currentSlide} selectedObjId={selectedObjId}></CurrentSlide>
        </div>
    )
}

export {
    Workspace,
}
