import styles from './player.module.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/Hooks/useAppSelector";
import { CurrentSlide } from "../slide/currentSlide";

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
                    scale={1.4}
                    className="current-slide"
                    showResizeHandles={false}
                    readOnly={true}
                    isShow={isShow}
                />
            </div>
        </div>
    );
}

export default Player;