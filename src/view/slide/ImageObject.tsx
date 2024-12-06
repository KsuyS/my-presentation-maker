import { ImageContent } from "../../store/PresentationType.ts";
import { CSSProperties, useEffect } from "react";
import { useDragAndDropObject } from '../../store/useDragAndDropForObject.ts';
import { SLIDE_WIDTH, SLIDE_HEIGHT } from '../slide/currentSlide';
import styles from './Object.module.css';
import { useResizeObject } from '../../store/useResizeObject';
import { ChangeObjectSize } from '../../store/ChangeObjectSize';
import { dispatch } from "../../store/editor.ts";

type ImageObjectProps = {
    imageObject: ImageContent,
    scale?: number,
    isSelected: boolean,
    onDragEnd: (newPosition: { x: number; y: number }) => void;
}

const MIN_SIZE = { width: 20, height: 20 };

function ImageObject({ imageObject, scale = 1, isSelected, onDragEnd }: ImageObjectProps) {
    console.log('ImageObject', imageObject.id, 'x', imageObject.position.x, 'y', imageObject.position.y, 'scale:', scale, imageObject.size.height, imageObject.size.width);

    const { position, onMouseDown } = useDragAndDropObject(
        onDragEnd,
        SLIDE_WIDTH * scale,
        SLIDE_HEIGHT * scale,
        imageObject.position,
        scale,
        imageObject.size.width * scale,
        imageObject.size.height * scale
    );

    const { size, startResize, stopResize, resize } = useResizeObject(
        position,
        {
            width: imageObject.size.width * scale,
            height: imageObject.size.height * scale
        },
        (newPosition, newSize) => {
            console.log('Resized to:', newPosition, newSize);
            dispatch(ChangeObjectSize, newSize);
        },
        scale,
        MIN_SIZE,
        
    );

    const width = size.width;
    const height = size.height;

    const imageStyles: CSSProperties = {
        position: 'absolute',
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${width}px`,
        height: `${height}px`,
    };

    if (isSelected) {
        imageStyles.border = '3px solid #0b57d0';
    }

    useEffect(() => {
        if (isSelected && resize) {
            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', stopResize);
            return () => {
                document.removeEventListener('mousemove', resize);
                document.removeEventListener('mouseup', stopResize);
            };
        }
    }, [isSelected, resize]);

    return (
        <div style={{ position: 'relative' }}>
            <img
                style={imageStyles}
                src={imageObject.src}
                onMouseDown={onMouseDown}
                alt="Draggable"
            />
            {isSelected && (
                <>
                    <div className={`${styles.resizeHandle} ${styles.topLeft}`}
                        style={{ top: `${position.y * scale - 5}px`, left: `${position.x * scale - 5}px` }}
                        onMouseDown={(e) => { e.stopPropagation(); startResize('topLeft'); }}></div>
                    <div className={`${styles.resizeHandle} ${styles.topRight}`}
                        style={{ top: `${position.y * scale - 5}px`, left: `${position.x * scale + width - 5}px` }}
                        onMouseDown={(e) => { e.stopPropagation(); startResize('topRight'); }}></div>
                    <div className={`${styles.resizeHandle} ${styles.bottomLeft}`}
                        style={{ top: `${position.y * scale + height - 5}px`, left: `${position.x * scale - 5}px` }}
                        onMouseDown={(e) => { e.stopPropagation(); startResize('bottomLeft'); }}></div>
                    <div className={`${styles.resizeHandle} ${styles.bottomRight}`}
                        style={{ top: `${position.y * scale + height - 5}px`, left: `${position.x * scale + width - 5}px` }}
                        onMouseDown={(e) => { e.stopPropagation(); startResize('bottomRight'); }}></div>
                    <div className={`${styles.resizeHandle} ${styles.top}`}
                        style={{ top: `${position.y * scale - 5}px`, left: `${position.x * scale + width / 2}px`, transform: 'translateX(-50%)' }}
                        onMouseDown={(e) => { e.stopPropagation(); startResize('top'); }}></div>
                    <div className={`${styles.resizeHandle} ${styles.bottom}`}
                        style={{ top: `${position.y * scale + height - 5}px`, left: `${position.x * scale + width / 2}px`, transform: 'translateX(-50%)' }}
                        onMouseDown={(e) => { e.stopPropagation(); startResize('bottom'); }}></div>
                    <div className={`${styles.resizeHandle} ${styles.left}`}
                        style={{ top: `${position.y * scale + height / 2}px`, left: `${position.x * scale - 5}px`, transform: 'translateY(-50%)' }}
                        onMouseDown={(e) => { e.stopPropagation(); startResize('left'); }}></div>
                    <div className={`${styles.resizeHandle} ${styles.right}`}
                        style={{ top: `${position.y * scale + height / 2}px`, left: `${position.x * scale + width - 5}px`, transform: 'translateY(-50%)' }}
                        onMouseDown={(e) => { e.stopPropagation(); startResize('right'); }}></div>
                </>
            )}
        </div>
    );
}

export {
    ImageObject,
};