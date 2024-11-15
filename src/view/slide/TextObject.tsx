import { TextContent } from "../../store/PresentationType.ts";
import { CSSProperties } from "react";
import { useDragAndDropObject } from '../../store/useDragAndDropForObject.ts';
import { SLIDE_WIDTH, SLIDE_HEIGHT } from '../slide/currentSlide';
import styles from './Object.module.css';

type TextObjectProps = {
    textObject: TextContent,
    scale?: number,
    isSelected: boolean,
    onDragEnd: (newPosition: { x: number; y: number }) => void;
}

function TextObject({ textObject, scale = 1, isSelected, onDragEnd }: TextObjectProps) {
    const { position, onMouseDown } = useDragAndDropObject(
        onDragEnd,
        SLIDE_WIDTH * scale,
        SLIDE_HEIGHT * scale,
        textObject.position,
        textObject.size.width * scale,
        textObject.size.height * scale
    );

    const width = textObject.size.width * scale;
    const height = textObject.size.height * scale;

    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${width}px`,
        height: `${height}px`,
        fontSize: `${textObject.fontSize * scale}px`,
    };

    if (isSelected) {
        textObjectStyles.border = '3px solid #0b57d0';
    }

    return (
        <div style={{ position: 'relative' }}>
            <p style={textObjectStyles} onMouseDown={onMouseDown}>{textObject.value}</p>
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
    TextObject,
}