import { TextContent } from "../../store/PresentationType.ts";
import { CSSProperties } from "react";
import { useDragAndDropObject } from '../../store/useDragAndDropForObject.ts';
import { SLIDE_WIDTH, SLIDE_HEIGHT} from '../slide/currentSlide'

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
    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${position.y * scale}px`,
        left: `${position.x * scale}px`,
        width: `${textObject.size.width * scale}px`,
        height: `${textObject.size.height * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`,
    }

    if (isSelected) {
        textObjectStyles.border = '3px solid #0b57d0';
    }

    return (
        <p style={textObjectStyles} onMouseDown={onMouseDown}>{textObject.value}</p>
    );
}

export {
    TextObject,
}