import styles from './player.module.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/Hooks/useAppSelector";
import { CurrentSlide } from "../slide/currentSlide";
import left from '../../assets/left.png';
import right from '../../assets/right.png';
import back from '../../assets/back.png';

function Player() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const slides = useAppSelector((state) => state.presentation.slides);

    const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case "ArrowLeft":
                prevSlide();
                break;
            case "ArrowRight":
                nextSlide();
                break;
            case "Escape":
                exitToEditor();
                break;
            default:
                break;
        }
    };

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

    const exitToEditor = () => {
        navigate("/editor");
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentSlide, navigate, slides]);

    const isShow = true;

    return (
        <div className={styles.container}>
            <div className={styles.slideWrapper}>
                <CurrentSlide
                    slide={slides[currentSlide]}
                    scale={1.25}
                    className="current-slide"
                    showResizeHandles={false}
                    readOnly={true}
                    isShow={isShow}
                />
                <button
                    onClick={exitToEditor}
                    className={styles.navigateButton}
                    title="Вернуться в редактор"
                >
                    <img src={back} alt="Вернуться в редактор" />
                </button>
                <div className={styles.navigationButtons}>
                    <button onClick={prevSlide} disabled={currentSlide === 0}>
                        <img src={left} alt="Назад" />
                    </button>
                    <button onClick={nextSlide} disabled={currentSlide === slides.length - 1}>
                        <img src={right} alt="Вперёд" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Player;