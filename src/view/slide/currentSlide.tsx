import { Slide } from "../../store/PresentationType.ts";
import { TextObject } from "./TextObject.tsx";
import { ImageObject } from "./ImageObject.tsx";
import styles from './Slide.module.css';
import { CSSProperties } from "react";
import { dispatch } from "../../store/editor.ts";
import { setSelection } from "../../store/setSelection.ts";

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
    };

    if (slide == null) {
        return (<></>);
    }

    const slideStyles: CSSProperties = {
        backgroundColor: slide.background.type === 'solid' ? slide.background.color : 'transparent',
        backgroundImage: slide.background.type === 'image' ? `url(${slide.background.src})` : 'none',
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
            {slide.content.map(slideObject => (
                <div key={slideObject.id} onClick={(e) => { e.stopPropagation(); onObjClick(slideObject.id); }}>
                    {slideObject.type === "text" ? (
                        <TextObject
                            textObject={slideObject}
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
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export {
    CurrentSlide
};