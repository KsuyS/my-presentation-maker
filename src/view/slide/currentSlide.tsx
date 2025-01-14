import styles from './Slide.module.css';
import { CSSProperties } from 'react';
import { Slide } from '../../store/PresentationType';
import { TextObject } from './TextObject';
import { ImageObject } from './ImageObject';
import { useAppSelector } from '../../store/Hooks/useAppSelector.ts';
import { useDragAndDropObject } from '../../store/Hooks/useDragAndDropForObject.ts';
import { useResizeObject } from '../../store/Hooks/useResizeObject.ts';
import { useAppActions } from '../../store/Hooks/useAppActions.ts';
import type { SelectionType } from '../../store/EditorType.ts';

const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;

type SlideProps = {
    slide: Slide | null,
    scale?: number,
    selection?: SelectionType,
    className: string,
    showResizeHandles?: boolean,
    readOnly?: boolean,
    isShow?: boolean,
};

function CurrentSlide({
    slide,
    scale = 1,
    className,
    showResizeHandles = true,
    readOnly = false,
    isShow = false,
}: SlideProps) {
    const selection = useAppSelector((editor => editor.selection))

    const {
        isDragging,
        temporaryPosition,
        handleElementMouseDown,
        handleElementMouseMove,
        handleElementMouseUp
    } = useDragAndDropObject({ slideId: slide?.id ?? '' });

    const {
        isResizing,
        temporarySize,
        temporaryPosition: resizeTemporaryPosition,
        handleResizeMouseDown,
        handleResizeMouseMove,
        handleResizeMouseUp
    } = useResizeObject({ slideId: slide?.id ?? '' });

    const { setSelection } = useAppActions()

    const onObjClick = (objectId: string) => {
        if (!readOnly && !isShow) {
            setSelection({
                selectedSlideIds: selection.selectedSlideIds,
                selectedObjectId: objectId,
            })
        } else {
            setSelection({
                selectedSlideIds: selection.selectedSlideIds,
                selectedObjectId: null,
            })
        }
    };

    const selectedObjId = selection.selectedObjectId;

    const onSlideClick = () => {
        if (selectedObjId && !readOnly && !isShow) {
            setSelection({
                selectedSlideIds: selection.selectedSlideIds,
                selectedObjectId: null,
            });
        }
    }

    if (slide == null) {
        return <></>;
    }

    const getBackgroundStyle = () => {
        let style: CSSProperties = {
            width: `${SLIDE_WIDTH * scale}px`,
            height: `${SLIDE_HEIGHT * scale}px`,
            position: 'relative',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            border: isShow
                ? '1px solid #545557'
                : (selection?.selectedSlideIds?.includes(slide.id) && readOnly ? '3px solid #545557' : '1px solid #545557'),
            zIndex: 1,
        };

        if (slide.background.type === 'solid') {
            style.backgroundColor = slide.background.color;
        } else if (slide.background.type === 'image') {
            style.backgroundImage = `url(${slide.background.src})`;
        } else if (slide.background.type === 'gradient') {
            style.backgroundImage = slide.background.gradient;
        }

        return style;
    };

    return (
        <div
            style={getBackgroundStyle()}
            className={`${styles.slide} ${className}`}
            onMouseMove={(event) => {
                if (isResizing && !isShow) {
                    handleResizeMouseMove(event);
                } else if (!readOnly && !isShow) {
                    handleElementMouseMove(event);
                }
            }}
            onMouseUp={() => {
                handleElementMouseUp();
                handleResizeMouseUp();
            }}
            onMouseLeave={() => {
                handleElementMouseUp();
                handleResizeMouseUp();
            }}
            onClick={onSlideClick}
        >
            {slide?.content.length === 0 ? (
                <div className={styles.emptySlideMessage}>
                </div>
            ) : (
                slide?.content.map(slideObject => {
                    const isSelectedObject = slideObject.id === selectedObjId;
                    const objectTemporaryPosition = isDragging && slideObject.id === selection.selectedObjectId
                        ? temporaryPosition
                        : isResizing && slideObject.id === selectedObjId
                            ? resizeTemporaryPosition
                            : null;

                    const objectTemporarySize = isResizing && slideObject.id === selectedObjId
                        ? temporarySize
                        : null;

                    return (
                        <div
                            key={slideObject.id}
                            onClick={(e) => { e.stopPropagation(); onObjClick(slideObject.id); }}
                            onMouseDown={(event) => handleElementMouseDown(event, slideObject.id)}
                            style={{ position: 'relative' }}
                        >
                            {slideObject.type === "text" ? (
                                <TextObject
                                    key={slideObject.id}
                                    textObject={slideObject}
                                    scale={scale}
                                    selection={selection}
                                    readOnly={readOnly || isShow}
                                    temporaryPosition={objectTemporaryPosition}
                                    temporarySize={objectTemporarySize}
                                />
                            ) : (
                                <ImageObject
                                    key={slideObject.id}
                                    imageObject={slideObject}
                                    scale={scale}
                                    selection={selection}
                                    readOnly={readOnly || isShow}
                                    temporaryPosition={objectTemporaryPosition}
                                    temporarySize={objectTemporarySize}
                                />
                            )}
                            {isSelectedObject && showResizeHandles && !readOnly && !isShow && (
                                <>
                                    <div
                                        className={`${styles.resizeHandle} ${styles.topLeft}`}
                                        onMouseDown={(event) => handleResizeMouseDown(event, slideObject.id, 'top-left')}
                                        style={{
                                            position: 'absolute',
                                            top: (objectTemporaryPosition?.y ?? slideObject.position.y) * scale - 5,
                                            left: (objectTemporaryPosition?.x ?? slideObject.position.x) * scale - 5
                                        }}
                                    />
                                    <div
                                        className={`${styles.resizeHandle} ${styles.topRight}`}
                                        onMouseDown={(event) => handleResizeMouseDown(event, slideObject.id, 'top-right')}
                                        style={{
                                            position: 'absolute',
                                            top: (objectTemporaryPosition?.y ?? slideObject.position.y) * scale - 5,
                                            left: (objectTemporaryPosition?.x ?? slideObject.position.x) * scale +
                                                (objectTemporarySize?.width ?? slideObject.size.width) * scale - 5
                                        }}
                                    />
                                    <div
                                        className={`${styles.resizeHandle} ${styles.bottomLeft}`}
                                        onMouseDown={(event) => handleResizeMouseDown(event, slideObject.id, 'bottom-left')}
                                        style={{
                                            position: 'absolute',
                                            top: (objectTemporaryPosition?.y ?? slideObject.position.y) * scale +
                                                (objectTemporarySize?.height ?? slideObject.size.height) * scale - 5,
                                            left: (objectTemporaryPosition?.x ?? slideObject.position.x) * scale - 5
                                        }}
                                    />
                                    <div
                                        className={`${styles.resizeHandle} ${styles.bottomRight}`}
                                        onMouseDown={(event) => handleResizeMouseDown(event, slideObject.id, 'bottom-right')}
                                        style={{
                                            position: 'absolute',
                                            top: (objectTemporaryPosition?.y ?? slideObject.position.y) * scale +
                                                (objectTemporarySize?.height ?? slideObject.size.height) * scale - 5,
                                            left: (objectTemporaryPosition?.x ?? slideObject.position.x) * scale +
                                                (objectTemporarySize?.width ?? slideObject.size.width) * scale - 5
                                        }}
                                    />
                                    <div
                                        className={`${styles.resizeHandle} ${styles.middleLeft}`}
                                        onMouseDown={(event) => handleResizeMouseDown(event, slideObject.id, 'middle-left')}
                                        style={{
                                            position: 'absolute',
                                            top: (objectTemporaryPosition?.y ?? slideObject.position.y) * scale +
                                                (objectTemporarySize?.height ?? slideObject.size.height) * scale / 2 - 5,
                                            left: (objectTemporaryPosition?.x ?? slideObject.position.x) * scale - 5
                                        }}
                                    />
                                    <div
                                        className={`${styles.resizeHandle} ${styles.middleRight}`}
                                        onMouseDown={(event) => handleResizeMouseDown(event, slideObject.id, 'middle-right')}
                                        style={{
                                            position: 'absolute',
                                            top: (objectTemporaryPosition?.y ?? slideObject.position.y) * scale +
                                                (objectTemporarySize?.height ?? slideObject.size.height) * scale / 2 - 5,
                                            left: (objectTemporaryPosition?.x ?? slideObject.position.x) * scale +
                                                (objectTemporarySize?.width ?? slideObject.size.width) * scale - 5
                                        }}
                                    />
                                    <div
                                        className={`${styles.resizeHandle} ${styles.topMiddle}`}
                                        onMouseDown={(event) => handleResizeMouseDown(event, slideObject.id, 'top-middle')}
                                        style={{
                                            position: 'absolute',
                                            top: (objectTemporaryPosition?.y ?? slideObject.position.y) * scale - 5,
                                            left: (objectTemporaryPosition?.x ?? slideObject.position.x) * scale +
                                                (objectTemporarySize?.width ?? slideObject.size.width) * scale / 2 - 5
                                        }}
                                    />
                                    <div
                                        className={`${styles.resizeHandle} ${styles.bottomMiddle}`}
                                        onMouseDown={(event) => handleResizeMouseDown(event, slideObject.id, 'bottom-middle')}
                                        style={{
                                            position: 'absolute',
                                            top: (objectTemporaryPosition?.y ?? slideObject.position.y) * scale +
                                                (objectTemporarySize?.height ?? slideObject.size.height) * scale - 5,
                                            left: (objectTemporaryPosition?.x ?? slideObject.position.x) * scale +
                                                (objectTemporarySize?.width ?? slideObject.size.width) * scale / 2 - 5
                                        }}
                                    />
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