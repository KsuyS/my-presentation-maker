import { Slide } from "../../store/PresentationType.ts";
import { TextObject } from "./TextObject.tsx";
import { ImageObject } from "./ImageObject.tsx";
import styles from './Slide.module.css'
import { CSSProperties } from "react";
import { dispatch } from "../../store/editor.ts";
import { setSelection } from "../../store/setSelection.ts";

const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525

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
        })
    }
    if (slide == null) {
        return (<></>)
    }

    const slideStyles: CSSProperties = {
        backgroundColor: slide.background.type === 'solid' ? slide.background.color : 'transparent',
        backgroundImage: slide.background.type === 'image' ? `url(${slide.background.src})` : 'none',
        backgroundSize: 'cover',
        position: 'relative',
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
    }

    if (isSelected) {
        slideStyles.border = '3px solid #0b57d0'
    }
    
    return (
        <div style={slideStyles} className={styles.slide + ' ' + className}>
            {slide.content.map(slideObject => {
                switch (slideObject.type) {
                    case "text":
                        return <div key={slideObject.id} onClick={() => onObjClick(slideObject.id)}> <TextObject key={slideObject.id} textObject={slideObject} scale={scale} isSelected={slideObject.id == selectedObjId} ></TextObject></div>
                    case "image":
                        return <div key={slideObject.id} onClick={() => onObjClick(slideObject.id)}> <ImageObject key={slideObject.id} imageObject={slideObject} scale={scale} isSelected={slideObject.id == selectedObjId}></ImageObject></div>
                }
            })}
        </div>
    )
}

export {
    CurrentSlide
}
