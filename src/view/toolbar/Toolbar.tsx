import styles from './Toolbar.module.css';
import { dispatch } from "../../store/editor.ts";
import { addSlide } from "../../store/AddSlide.ts";
import { removeSlide } from "../../store/RemoveSlide.ts";
import { addText } from "../../store/AddTextOnSlide.ts";
import { addImage } from "../../store/AddImageOnSlide.ts";
import { removeObject } from "../../store/RemoveObjectOnSlide.ts";
import { changeColorBackground } from "../../store/ChangeColorBackground.ts";

import { changeImgBackground } from "../../store/ChangeImgBackground.ts";



import addSlideIcon from '../../assets/add-slide.png';
import removeSlideIcon from '../../assets/delete-slide.png';
import addTextIcon from '../../assets/add-slide.png';
import removeTextIcon from '../../assets/delete-slide.png';
import addImageIcon from '../../assets/add-slide.png';

function Toolbar() {
    function onAddSlide() {
        dispatch(addSlide);
    }

    function onRemoveSlide() {
        dispatch(removeSlide);
    }

    function onAddText() {
        dispatch(addText);
    }

    function onRemoveObject() {
        dispatch(removeObject);
    }

    function onAddImage() {
        dispatch(addImage);
    }

    function onChangeColorBackground() {
        dispatch(changeColorBackground);
    }

    function onChangeImgBackground() {
        dispatch(changeImgBackground);
    }
    

    return (
        <div className={styles.toolbar}>
            <button className={styles.button} onClick={onAddSlide}>
                <img className={styles.imageButton} src={addSlideIcon} alt="Добавить слайд" />
                Добавить слайд
            </button>
            <button className={styles.button} onClick={onRemoveSlide}>
                <img className={styles.imageButton} src={removeSlideIcon} alt="Удалить слайд" />
                Удалить слайд
            </button>
            <button className={styles.button} onClick={onAddText}>
                <img className={styles.imageButton} src={addTextIcon} alt="Добавить текст" />
                Добавить текст
            </button>
            <button className={styles.button} onClick={onRemoveObject}>
                <img className={styles.imageButton} src={removeTextIcon} alt="Удалить объект" />
                Удалить объект
            </button>
            <button className={styles.button} onClick={onAddImage}>
                <img className={styles.imageButton} src={addImageIcon} alt="Добавить изображение" />
                Добавить изображение
            </button>

            <div className={styles.changeBackground}>
                <button className={styles.button} onClick={onChangeColorBackground}>
                    Изменить цвет фона
                </button>
            </div>

            <div className={styles.changeBackground}>
                <button className={styles.button} onClick={onChangeImgBackground}>
                    Изменить изображение фона
                </button>
            </div>
        </div>
    );
}

export { Toolbar }
