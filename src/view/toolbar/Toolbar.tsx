import styles from './Toolbar.module.css';
import { useAppSelector } from '../../store/Hooks/useAppSelector.ts';
import { useAppActions } from '../../store/Hooks/useAppActions.ts';
import { exportToJson, importFromJson } from "../../utils/jsonUtils";
import * as React from "react";
import { HistoryContext } from '../../store/Hooks/historyContext.ts';

import addSlideIcon from '../../assets/add-slide.png';
import removeSlideIcon from '../../assets/delete-slide.png';
import addTextIcon from '../../assets/add-slide.png';
import removeTextIcon from '../../assets/delete-slide.png';
import addImageIcon from '../../assets/add-slide.png';
import undoIcon from '../../assets/undo.png';
import redoIcon from '../../assets/redo.png';

import { useState, useEffect } from 'react';

function Toolbar() {
    const [backgroundOption, setBackgroundOption] = useState<'color' | 'image'>('color');
    const { setEditor, addSlide, removeSlide, addText, addImage, removeObject, changeBackground } = useAppActions()
    const history = React.useContext(HistoryContext);

    const onChangeImgUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result && typeof reader.result === 'string') {
                    addImage({ src: reader.result });
                } else {
                    console.error("Failed to read file as data URL");
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const onChangeColorBackground: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const color = (event.target as HTMLInputElement).value;
        changeBackground({ type: 'solid', value: color });
    };

    const onChangeImgBackground: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result && typeof reader.result === 'string') {
                    changeBackground({ type: 'image', value: reader.result });
                } else {
                    console.error("Failed to read file as data URL");
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const editor = useAppSelector((editor => editor));

    const handleExport = () => {
        exportToJson(editor);
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            importFromJson(file, setEditor);
        }
    };

    function onUndo() {
        const newEditor = history.undo()
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    function onRedo() {
        const newEditor = history.redo()
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().includes('MAC');
            const ctrlOrCmd = isMac ? event.metaKey : event.ctrlKey;

            if (ctrlOrCmd && event.key === 'z') {
                event.preventDefault();
                onUndo();
            }
            if (ctrlOrCmd && event.key === 'y') {
                event.preventDefault();
                onRedo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onUndo, onRedo]);

    return (
        <div className={styles.toolbar}>
            <button className={styles.button} onClick={addSlide}>
                <img className={styles.imageButton} src={addSlideIcon} alt="Добавить слайд" />
                Добавить слайд
            </button>
            <button className={styles.button} onClick={removeSlide}>
                <img className={styles.imageButton} src={removeSlideIcon} alt="Удалить слайд" />
                Удалить слайд
            </button>
            <button className={styles.button} onClick={addText}>
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
            <button className={styles.button} onClick={removeObject}>
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

            <button className={styles.button} onClick={onUndo}>
                <img className={styles.imageButton} src={undoIcon} alt="Undo" />
                Undo
            </button>

            <button className={styles.button} onClick={onRedo}>
                <img className={styles.imageButton} src={redoIcon} alt="Redo" />
                Redo
            </button>
        </div>
    );
}

export { Toolbar };