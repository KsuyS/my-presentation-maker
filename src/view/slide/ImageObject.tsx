import { ImageContent } from "../../store/PresentationType.ts";
import { CSSProperties } from "react";
import { useDragAndDropObject } from '../../store/useDragAndDropForObject.ts';
import { SLIDE_WIDTH, SLIDE_HEIGHT} from '../slide/currentSlide'

type ImageObjectProps = {
    imageObject: ImageContent,
    scale?: number,
    isSelected: boolean,
    onDragEnd: (newPosition: { x: number; y: number }) => void;
}

function ImageObject({ imageObject, scale = 1, isSelected, onDragEnd }: ImageObjectProps) {
    const { position, onMouseDown } = useDragAndDropObject(
        onDragEnd,
        SLIDE_WIDTH * scale,
        SLIDE_HEIGHT * scale,
        imageObject.position,
        imageObject.size.width,
        imageObject.size.height
    );

    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${imageObject.size.width * scale}px`,
        height: `${imageObject.size.height * scale}px`,
    };

    if (isSelected) {
        imageObjectStyles.border = '3px solid #0b57d0';
    }

    return (
        <div>
            <img 
                style={imageObjectStyles} 
                src={imageObject.src} 
                onMouseDown={onMouseDown}
                alt="Draggable"
            />
        </div>
    );
}

export {
    ImageObject,
}