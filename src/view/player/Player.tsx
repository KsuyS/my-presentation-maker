import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/Hooks/useAppSelector.ts";
import { CurrentSlide } from "../slide/currentSlide.tsx";
import styles from './player.module.css';

import left from '../../assets/left.png';
import right from '../../assets/right.png';

function Player() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const slides = useAppSelector((state) => state.presentation.slides);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.slideWrapper}>
                <CurrentSlide
                    slide={slides[currentSlide]}
                    scale={1}
                    className="current-slide"
                    showResizeHandles={false}
                    readOnly={true}
                />
            </div>

            <div className={styles.button}>
                <button className={styles.button} onClick={prevSlide} disabled={currentSlide === 0}>
                    <img className={styles.imageButton} src={left} alt="Назад" />
                </button>
                <button className={styles.button} onClick={nextSlide} disabled={currentSlide === slides.length - 1}>
                    <img className={styles.imageButton} src={right} alt="Вперёд" />
                </button>
            </div>

            <button
                onClick={() => navigate("/")}
                className={styles.navigateButton}
            >
                Вернуться в редактор
            </button>
        </div>
    );
}

export default Player;