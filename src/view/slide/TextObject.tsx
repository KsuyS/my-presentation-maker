import { SelectionType } from "../../store/EditorType";
import { TextContent } from "../../store/PresentationType";
import { useAppActions } from "../../store/Hooks/useAppActions.ts";
import { CSSProperties, useState } from "react";

type TextObjectProps = {
    textObject: TextContent;
    scale?: number;
    selection: SelectionType;
};

function TextObject({ textObject, scale = 1, selection }: TextObjectProps) {
    const { updateTextContent } = useAppActions();
    const [isEditing, setIsEditing] = useState(false);
    const [newValue, setNewValue] = useState(textObject.value);

    const textObjectStyles: CSSProperties = {
        position: "absolute",
        top: `${textObject.position.y * scale}px`,
        left: `${textObject.position.x * scale}px`,
        width: `${textObject.size.width * scale}px`,
        height: `${textObject.size.height * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`,
        zIndex: 3,
        border: selection.selectedObjectId === textObject.id ? "3px solid #545557" : "none",
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (newValue !== textObject.value && selection.selectedSlideId) {
            updateTextContent(selection.selectedSlideId, textObject.id, newValue);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewValue(e.target.value);
    };

    return isEditing ? (
        <textarea
            autoFocus
            style={{
                ...textObjectStyles,
                resize: "none",
                outline: "none",
                border: "1px solid #545557",
                fontSize: `${textObject.fontSize * scale}px`,
                backgroundColor: "transparent",
                color: "inherit",
            }}
            value={newValue}
            onChange={handleChange}
            onBlur={handleBlur}
        />
    ) : (
        <p onDoubleClick={handleDoubleClick} style={textObjectStyles}>
            {textObject.value}
        </p>
    );
}

export { TextObject };