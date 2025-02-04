import { Slide } from "../../store/Editor/PresentationType";
import { TextObject } from "./TextObject";
import { ImageObject } from "./ImageObject";
import styles from './Slide.module.css';
import { CSSProperties } from "react";
import { dispatch } from "../../store/Editor/editor";
import { setSelection } from "../../store/Editor/SetSelection";
import { useDragAndDropObject } from "../../store/СustomHooks/useDragAndDropForObject";
import { useResizeObject } from "../../store/СustomHooks/useResizeObject";

const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;

type SlideProps = {
    slide: Slide | null;
    scale?: number;
    isSelected: boolean;
    className: string;
    selectedObjId: string | null;
    showResizeHandles?: boolean;
};

function CurrentSlide({
    slide,
    scale = 1,
    isSelected,
    className,
    selectedObjId,
    showResizeHandles = true,
}: SlideProps) {
    const { isDragging, handleElementMouseDown, handleElementMouseMove, handleElementMouseUp } = useDragAndDropObject({ slideId: slide?.id ?? '' });
    const { isResizing, handleResizeMouseDown, handleResizeMouseMove, handleResizeMouseUp } = useResizeObject({ slideId: slide?.id ?? '' });

    function onObjClick(objectId: string): void {
        dispatch(setSelection, {
            selectedSlideId: slide?.id,
            selectedObjectId: objectId,
        });
    }

    function onSlideClick(): void {
        if (selectedObjId) {
            dispatch(setSelection, {
                selectedSlideId: slide?.id,
                selectedObjectId: null,
            });
        }
    }

    if (slide == null) {
        return <></>;
    }

    const slideStyles: CSSProperties = {
        backgroundColor: slide.background?.type === 'solid' ? slide.background.color : 'transparent',
        backgroundImage: slide.background?.type === 'image' ? `url(${slide.background.src})` : 'none',
        backgroundSize: 'cover',
        position: 'relative',
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
        zIndex: 1,
    };

    if (isSelected) {
        slideStyles.border = '3px solid #545557';
    }

    return (
        <div
            style={slideStyles}
            className={`${styles.slide} ${className}`}
            onMouseMove={(event) => {
                if (isResizing) {
                    handleResizeMouseMove(event);
                } else {
                    handleElementMouseMove(event);
                }
            }}
            onMouseUp={() => {
                handleElementMouseUp();
                handleResizeMouseUp();
            }}
            onMouseLeave={handleResizeMouseUp}
            onClick={onSlideClick}
        >
            {slide.content.length === 0 ? (
                <div className={styles.emptySlideMessage}>
                </div>
            ) : (
                slide.content.map(slideObject => {
                    const isSelectedObject = slideObject.id === selectedObjId;

                    return (
                        <div
                            key={slideObject.id}
                            onClick={(e) => { e.stopPropagation(); onObjClick(slideObject.id); }}
                            onMouseDown={(event) => handleElementMouseDown(event, slideObject.id)}
                            style={{ position: 'relative' }}
                        >
                            {slideObject.type === "text" ? (
                                <TextObject
                                    textObject={{ ...slideObject }}
                                    scale={scale}
                                    isSelected={isSelectedObject}
                                />
                            ) : (
                                <ImageObject
                                    imageObject={slideObject}
                                    scale={scale}
                                    isSelected={isSelectedObject}
                                />
                            )}
                            {isSelectedObject && showResizeHandles && (
                                <>
                                    <div className={`${styles.resizeHandle} ${styles.topLeft}`}
                                        onMouseDown={(event) => handleResizeMouseDown(event, slideObject.id, 'top-left')}
                                        style={{ position: 'absolute', top: slideObject.position.y -5, left: slideObject.position.x -5 }} />
                                    <div className={`${styles.resizeHandle} ${styles.topRight}`}
                                        onMouseDown={(event) => handleResizeMouseDown(event, slideObject.id, 'top-right')}
                                        style={{ position: 'absolute', top: slideObject.position.y -5, left: slideObject.position.x + slideObject.size.width -5}} />
                                    <div className={`${styles.resizeHandle} ${styles.bottomLeft}`}
                                        onMouseDown={(event) => handleResizeMouseDown(event, slideObject.id, 'bottom-left')}
                                        style={{ position: 'absolute', top: slideObject.position.y + slideObject.size.height -5, left: slideObject.position.x -5 }} />
                                    <div className={`${styles.resizeHandle} ${styles.bottomRight}`}
                                        onMouseDown={(event) => handleResizeMouseDown(event, slideObject.id, 'bottom-right')}
                                        style={{ position: 'absolute', top: slideObject.position.y + slideObject.size.height - 5, left: slideObject.position.x + slideObject.size.width - 5 }} />
                                    <div className={`${styles.resizeHandle} ${styles.middleLeft}`}
                                        onMouseDown={(event) => handleResizeMouseDown(event, slideObject.id, 'middle-left')}
                                        style={{ position: 'absolute', top: slideObject.position.y + slideObject.size.height / 2 -5, left: slideObject.position.x -5}} />
                                    <div className={`${styles.resizeHandle} ${styles.middleRight}`}
                                        onMouseDown={(event) => handleResizeMouseDown(event, slideObject.id, 'middle-right')}
                                        style={{ position: 'absolute', top: slideObject.position.y + slideObject.size.height / 2 -5, left: slideObject.position.x + slideObject.size.width -5 }} />
                                    <div className={`${styles.resizeHandle} ${styles.topMiddle}`}
                                        onMouseDown={(event) => handleResizeMouseDown(event, slideObject.id, 'top-middle')}
                                        style={{ position: 'absolute', top: slideObject.position.y -5, left: slideObject.position.x + slideObject.size.width / 2 -5}} />
                                    <div className={`${styles.resizeHandle} ${styles.bottomMiddle}`}
                                        onMouseDown={(event) => handleResizeMouseDown(event, slideObject.id, 'bottom-middle')}
                                        style={{ position: 'absolute', top: slideObject.position.y + slideObject.size.height -5, left: slideObject.position.x + slideObject.size.width / 2 -5}} />
                                </>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
}

export {
    CurrentSlide
};
