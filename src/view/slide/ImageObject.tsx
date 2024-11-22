import { ImageContent } from "../../store/PresentationType.ts";
import { CSSProperties } from "react";
import { useDragAndDropObject } from '../../store/useDragAndDropForObject.ts';
import { SLIDE_WIDTH, SLIDE_HEIGHT } from '../slide/currentSlide';
import styles from './Object.module.css';
import { ChangeObjectPosition } from "../../store/ChangeObjectPosition.ts";
import { dispatch } from "../../store/editor.ts";

type ImageObjectProps = {
    imageObject: ImageContent,
    scale?: number,
    isSelected: boolean,
    onDragEnd: (newPosition: { x: number; y: number }) => void;
}

function ImageObject({ imageObject, scale = 1, isSelected }: ImageObjectProps) {
    
    const { position, onMouseDown } = useDragAndDropObject(
        (newPosition) => {
            console.log('Dispatching ChangeObjectPosition with id:', imageObject.id);
            console.log('Dragging ended with position:', newPosition);
            
            dispatch(ChangeObjectPosition, { id: imageObject.id, newPosition});
        },
        SLIDE_WIDTH * scale,
        SLIDE_HEIGHT * scale,
        imageObject.position,
        imageObject.size.width * scale,
        imageObject.size.height * scale
    );

    const width = imageObject.size.width * scale;
    const height = imageObject.size.height * scale;

    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${width}px`,
        height: `${height}px`,
    };

    if (isSelected) {
        imageObjectStyles.border = '3px solid #0b57d0';
    }

    return (
        <div style={{ position: 'relative' }}>
            <img 
                style={imageObjectStyles} 
                src={imageObject.src} 
                onMouseDown={onMouseDown}
                alt="Draggable"
            />
            {isSelected && (
                <>
                    <div className={`${styles.resizeHandle} ${styles.topLeft}`} style={{ top: `${position.y * scale - 5}px`, left: `${position.x * scale - 5}px` }}></div>
                    <div className={`${styles.resizeHandle} ${styles.topRight}`} style={{ top: `${position.y * scale - 5}px`, left: `${position.x * scale + width - 5}px` }}></div>
                    <div className={`${styles.resizeHandle} ${styles.bottomLeft}`} style={{ top: `${position.y * scale + height - 5}px`, left: `${position.x * scale - 5}px` }}></div>
                    <div className={`${styles.resizeHandle} ${styles.bottomRight}`} style={{ top: `${position.y * scale + height - 5}px`, left: `${position.x * scale + width - 5}px` }}></div>
                    <div className={`${styles.resizeHandle} ${styles.top}`} style={{ top: `${position.y * scale - 5}px`, left: `${position.x * scale + width / 2}px`, transform: 'translateX(-50%)' }}></div>
                    <div className={`${styles.resizeHandle} ${styles.bottom}`} style={{ top: `${position.y * scale + height - 5}px`, left: `${position.x * scale + width / 2}px`, transform: 'translateX(-50%)' }}></div>
                    <div className={`${styles.resizeHandle} ${styles.left}`} style={{ top: `${position.y * scale + height / 2}px`, left: `${position.x * scale - 5}px`, transform: 'translateY(-50%)' }}></div>
                    <div className={`${styles.resizeHandle} ${styles.right}`} style={{ top: `${position.y * scale + height / 2}px`, left: `${position.x * scale + width - 5}px`, transform: 'translateY(-50%)' }}></div>
                </>
            )}
        </div>
    );
}

export {
    ImageObject,
}