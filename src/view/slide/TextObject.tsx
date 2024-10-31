import { TextContent } from "../../store/PresentationType.ts";
import { CSSProperties } from "react";

type TextObjectProps = {
    textObject: TextContent,
    scale?: number,
    isSelected: boolean,
}
function TextObject({ textObject, scale = 1, isSelected }: TextObjectProps) {

    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${textObject.position.y * scale}px`,
        left: `${textObject.position.x * scale}px`,
        width: `${textObject.size.width * scale}px`,
        height: `${textObject.size.height * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`,
    }

    if (isSelected) {
        textObjectStyles.border = '3px solid #0b57d0'
    }
    return (
        <p style={textObjectStyles}>{textObject.value}</p>
    )
}

export {
    TextObject,
}
