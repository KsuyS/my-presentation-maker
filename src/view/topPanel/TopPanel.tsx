import styles from './TopPanel.module.css';
import { renamePresentationTitle } from "../../store/function/RenamePresentationTitle";
import { dispatch } from "../../store/editor"
import * as React from "react";
import { useAppSelector } from '../../store/Hooks/useAppSelector.ts';
import logo from '../../assets/logo.png';

function TopPanel() {
    const editor = useAppSelector((editor => editor))
    const title = editor.presentation.title

    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value)
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