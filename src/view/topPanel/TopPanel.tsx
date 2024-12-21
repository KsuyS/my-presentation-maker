import styles from './TopPanel.module.css';
import * as React from "react";
import { useAppSelector } from '../../store/Hooks/useAppSelector.ts';
import logo from '../../assets/logo.png';
import { useAppActions } from '../../store/Hooks/useAppActions.ts';

function TopPanel() {
    const editor = useAppSelector((editor => editor))
    const title = editor.presentation.title

    const { renamePresentationTitle } = useAppActions()

    const onTitleChange: React.ChangeEventHandler = (event) => {
        renamePresentationTitle((event.target as HTMLInputElement).value)
    }

    return (
        <div className={styles.topPanel}>
            <img className={styles.logo} src={logo} />
            <input className={styles.title} type="text" defaultValue={title} onChange={onTitleChange} />
        </div>
    )
}

export {
    TopPanel,
}