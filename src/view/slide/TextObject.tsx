import { SelectionType } from "../../store/EditorType";
import { TextContent } from "../../store/PresentationType";
import { useAppActions } from "../../store/Hooks/useAppActions.ts";
import { CSSProperties } from "react";


type TextObjectProps = {
    textObject: TextContent,
    scale?: number,
    selection: SelectionType
}

function TextObject({ textObject, scale = 1, selection }: TextObjectProps) {

    const { setSelection } = useAppActions()

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

    function onTextClick(textObject: string) {
        setSelection({
            selectedSlideId: selection.selectedSlideId,
            selectedObjectId: textObject,
        })
    }

    return <p onClick={() => onTextClick(textObject.id)} style={textObjectStyles}>{textObject.value}</p>;
}

export {
    TextObject,
}