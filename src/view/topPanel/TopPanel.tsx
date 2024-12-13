import styles from './TopPanel.module.css';
import {renamePresentationTitle} from "../../store/RenamePresentationTitle";
import {dispatch} from "../../store/Editor/editor";

import logo from '../../assets/logo.png'

type TitlePresentationProps = {
    title: string,
}

function TopPanel({ title }: TitlePresentationProps) {
    
    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value)
    }

    return (
        <div className={styles.topPanel}>
            <img className={styles.logo} src={logo}/>
            <input className={styles.title} type="text" defaultValue={title} onChange={onTitleChange}/>
        </div>
    )
}

export {
    TopPanel,
}