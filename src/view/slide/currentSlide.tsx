import { Slide } from "../../store/Editor/PresentationType";
import { TextObject } from "./TextObject";
import { ImageObject } from "./ImageObject";
import styles from './Slide.module.css';
import { CSSProperties } from "react";
import { dispatch } from "../../store/Editor/editor";
import { setSelection } from "../../store/Editor/SetSelection";
import { ChangeObjectPosition } from "../../store/ChangeObjectPosition";

export const SLIDE_WIDTH = 935;
export const SLIDE_HEIGHT = 525;

type SlideProps = {
    slide: Slide | null,
    scale?: number,
    isSelected: boolean,
    className: string,
    selectedObjId: string | null
}

function CurrentSlide({ slide, scale = 1, isSelected, className, selectedObjId }: SlideProps) {
    function onObjClick(objectId: string): void {
        dispatch(setSelection, {
            selectedSlideId: slide?.id,
            selectedObjectId: objectId,
        });
    }

    function onSlideClick(): void {
        dispatch(setSelection, {
            selectedSlideId: slide?.id,
            selectedObjectId: null,
        });
    }

    const handleDragEnd = (objectId: string, newPosition: { x: number; y: number }) => {
        console.log(`Объект ${objectId} перемещен на новую позицию`, newPosition);
        dispatch(ChangeObjectPosition, newPosition);
    };

    const slideStyles: CSSProperties = {
        backgroundColor: slide?.background.type === 'solid' ? slide.background.color : 'transparent',
        backgroundImage: slide?.background.type === 'image' ? `url(${slide.background.src})` : 'none',
        backgroundSize: 'cover',
        position: 'relative',
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
        overflow: 'hidden',
    };

    if (isSelected) {
        slideStyles.border = '3px solid #0b57d0';
    }

    return (
        <div style={slideStyles} className={`${styles.slide} ${className}`} onClick={onSlideClick}>
            {slide && slide.content.length === 0 ? (
                <div className={styles.emptySlideMessage}>
                </div>
            ) : (
                slide?.content.map(slideObject => (
                    <div key={slideObject.id} onClick={(e) => { e.stopPropagation(); onObjClick(slideObject.id); }}>
                        {slideObject.type === "text" ? (
                            <TextObject
                                textObject={{ ...slideObject }}
                                scale={scale}
                                isSelected={slideObject.id === selectedObjId}
                                onDragEnd={(newPosition) => handleDragEnd(slideObject.id, newPosition)}
                            />
                        ) : (
                            <ImageObject
                                imageObject={slideObject}
                                scale={scale}
                                isSelected={slideObject.id === selectedObjId}
                                onDragEnd={(newPosition) => handleDragEnd(slideObject.id, newPosition)}
                                slideId={slide.id}
                            />
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export {
    CurrentSlide
};