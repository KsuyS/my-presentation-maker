import {Slide} from "../../store/PresentationType.ts";
import { CurrentSlide } from '../slide/currentSlide.tsx'

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
