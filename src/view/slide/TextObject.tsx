import { SelectionType } from "../../store/EditorType";
import { TextContent } from "../../store/PresentationType";
import { useAppActions } from "../../store/Hooks/useAppActions.ts";
import { CSSProperties, useState, useEffect, useRef } from "react";

type TextObjectProps = {
    textObject: TextContent;
    scale?: number;
    selection: SelectionType;
    readOnly: boolean;
    temporaryPosition?: { x: number, y: number } | null;
    temporarySize?: { width: number, height: number } | null;
};

function TextObject({ textObject, scale = 1, selection, readOnly, temporaryPosition, temporarySize }: TextObjectProps) {
    const { updateTextContent } = useAppActions();
    const [isEditing, setIsEditing] = useState(false);
    const [newValue, setNewValue] = useState(textObject.value);
    const editableRef = useRef<HTMLDivElement | null>(null);
    const cursorPosition = useRef<number | null>(null);
    useEffect(() => { setNewValue(textObject.value); }, [textObject.value]);

    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${(temporaryPosition?.y ?? textObject.position.y) * scale}px`,
        left: `${(temporaryPosition?.x ?? textObject.position.x) * scale}px`,
        width: `${(temporarySize?.width ?? textObject.size.width) * scale}px`,
        height: `${(temporarySize?.height ?? textObject.size.height) * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`,
        fontFamily: textObject.fontFamily,
        color: textObject.fontColor,
        textAlign: textObject.textAlign || 'left',
        fontWeight: textObject.fontWeight || 'normal',
        fontStyle: textObject.fontStyle || 'normal',
        textDecoration: textObject.textDecoration || 'capitalize',
        textTransform: textObject.textCase === 'uppercase' ? 'uppercase' :
            textObject.textCase === 'lowercase' ? 'lowercase' :
                textObject.textCase === 'capitalize' ? 'capitalize' :
                    'none',
        backgroundColor: textObject.backgroundColor || 'transparent',
        zIndex: 3,
        border: !readOnly && selection.selectedObjectId === textObject.id
            ? "3px solid #545557"
            : "none",
    };

    const setCursor = (position: number | null) => {
        const el = editableRef.current;
        if (!el || position === null) return;

        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(el.childNodes[0] || el, Math.min(position, el.textContent?.length || 0));
        range.collapse(true);
        sel?.removeAllRanges();
        sel?.addRange(range);
    };

    const saveCursorPosition = () => {
        const selection = window.getSelection();
        if (selection?.rangeCount) {
            const range = selection.getRangeAt(0);
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(editableRef.current!);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            cursorPosition.current = preCaretRange.toString().length;
        }
    };

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        saveCursorPosition();
        setNewValue(e.currentTarget.textContent || '');
    };

    const handleDoubleClick = () => {
        if (!readOnly) {
            setIsEditing(true);
            setTimeout(() => setCursor(newValue.length), 0);
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (newValue !== textObject.value && selection.selectedSlideIds.length > 0) {
            selection.selectedSlideIds.forEach(slideId => {
                updateTextContent(slideId, textObject.id, newValue);
            });
        }
    };

    useEffect(() => {
        if (isEditing) {
            setTimeout(() => setCursor(cursorPosition.current), 0);
        }
    }, [newValue]);

    return (
        <div
            ref={editableRef}
            style={textObjectStyles}
            onDoubleClick={handleDoubleClick}
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onInput={handleInput}
            onBlur={handleBlur}
        >
            {newValue}
        </div>
    );
}

export { TextObject };