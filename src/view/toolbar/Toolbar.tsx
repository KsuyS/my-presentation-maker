import styles from './Toolbar.module.css';
import { dispatch } from "../../store/Editor/editor";
import { addSlide } from "../../store/AddSlide";
import { removeSlide } from "../../store/RemoveSlide";
import { addText } from "../../store/AddTextOnSlide";
import { addImage } from "../../store/AddImageOnSlide";
import { removeObject } from "../../store/RemoveObjectOnSlide";
import { changeBackground } from "../../store/ChangeBackground";
import { exportToJson, importFromJson } from "../../store/Utils/jsonUtils";
import { getEditor } from '../../store/Editor/editor';

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

    const onChangeImgUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(addImage, { src: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const onChangeColorBackground: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const color = (event.target as HTMLInputElement).value;
        dispatch(changeBackground, { type: 'solid', value: color });
    };

    const onChangeImgBackground: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(changeBackground, { type: 'image', value: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleExport = () => {
        const currentEditor = getEditor();
        exportToJson(currentEditor);
        console.log("Экспортируемые данные:", getEditor());
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            importFromJson(file);
        }
    };

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
            <div className={styles.changeImage}>
                <input
                    type="file"
                    id="imageUploader"
                    accept="image/*"
                    onChange={onChangeImgUpload}
                    className={styles.imageUploader}
                />
                <label htmlFor="imageUploader" className={`${styles.button} ${styles.fileLabel}`}>
                    <img className={styles.imageButton} src={addImageIcon} alt="Добавить изображение" />
                    Добавить изображение
                </label>
            </div>
            <button className={styles.button} onClick={onRemoveObject}>
                <img className={styles.imageButton} src={removeTextIcon} alt="Удалить объект" />
                Удалить объект
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
                        id="bgImageUploader"
                        accept="image/*"
                        onChange={onChangeImgBackground}
                        className={styles.imageUploader}
                    />
                    <label htmlFor="bgImageUploader" className={`${styles.button} ${styles.fileLabel}`}>
                        Выберите изображение для фона
                    </label>
                </div>
            )}

            <button className={styles.button} onClick={handleExport}>
                Экспорт
            </button>

            <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: 'none' }}
                id="jsonFileInput"
            />
            <label htmlFor="jsonFileInput" className={`${styles.button}`}>
                Импорт
            </label>
        </div>
    );
}

export { Toolbar };