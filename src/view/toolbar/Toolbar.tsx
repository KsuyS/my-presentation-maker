import styles from './Toolbar.module.css';
import { dispatch } from "../../store/editor.ts";
import { addSlide } from "../../store/AddSlide.ts";
import { removeSlide } from "../../store/RemoveSlide.ts";
import { addText } from "../../store/AddTextOnSlide.ts";
import { addImage } from "../../store/AddImageOnSlide.ts";
import { removeObject } from "../../store/RemoveObjectOnSlide.ts";
import { changeBackground } from "../../store/ChangeBackground.ts";

import addSlideIcon from '../../assets/add-slide.png';
import removeSlideIcon from '../../assets/delete-slide.png';
import addTextIcon from '../../assets/add-slide.png';
import removeTextIcon from '../../assets/delete-slide.png';
import addImageIcon from '../../assets/add-slide.png';

import { useState } from 'react';

function Toolbar() {
    const [backgroundOption, setBackgroundOption] = useState<'color' | 'image'>('color');

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

    const onChangeColorBackground: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const color = (event.target as HTMLInputElement).value;
        dispatch(changeBackground, { type: 'solid', value: color });
    }

    const onChangeImgBackground: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(changeBackground, { type: 'image', value: reader.result });
            };
            reader.readAsDataURL(file);
        }
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
                <select
                    id="backgroundSelector"
                    value={backgroundOption}
                    onChange={(e) => setBackgroundOption(e.target.value as 'color' | 'image')}
                    className={`${styles.dropdown} ${styles.button}`}
                >
                    <option value="color">Цвет фона</option>
                    <option value="image">Фоновое изображение</option>
                </select>
            </div>

            {backgroundOption === 'color' && (
                <div className={styles.changeColor}>
                    <input 
                        type="color" 
                        id="colorPicker" 
                        onChange={onChangeColorBackground}
                        className={`${styles.colorPicker}`}
                    />
                </div>
            )}

            {backgroundOption === 'image' && (
                <div className={styles.changeImage}>
                    <input 
                        type="file" 
                        id="imageUploader" 
                        accept="image/*"
                        onChange={onChangeImgBackground}
                        className={styles.imageUploader}
                    />
                    <label htmlFor="imageUploader" className={`${styles.button} ${styles.fileLabel}`}>
                        Выберите изображение
                    </label>
                </div>
            )}
        </div>
    );
}

export { Toolbar };