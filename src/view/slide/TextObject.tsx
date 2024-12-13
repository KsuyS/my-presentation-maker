import { SelectionType } from "../../store/EditorType";
import { TextContent } from "../../store/PresentationType";
import { dispatch } from "../../store/editor.ts";
import { setSelection } from "../../store/SetSelection.ts";
import { CSSProperties } from "react";


type TextObjectProps = {
    textObject: TextContent,
    scale?: number,
    selection: SelectionType
}

function TextObject({ textObject, scale = 1, selection }: TextObjectProps) {
    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${textObject.position.y * scale}px`,
        left: `${textObject.position.x * scale}px`,
        width: `${textObject.size.width * scale}px`,
        height: `${textObject.size.height * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`,
        zIndex: 3,
    };

    if (selection.selectedObjectId === textObject.id) {
        textObjectStyles.border = '3px solid #545557';
    }
    const onTextClick = () => {
        dispatch(setSelection, {
            selectedSlideId: selection.selectedSlideId,
            selectedObjectId: textObject.id,
        })
    }

    return <p onClick={onTextClick} style={textObjectStyles}>{textObject.value}</p>;
}

export {
    TextObject,
}