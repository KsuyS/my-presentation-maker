import { ImageContent } from "../../store/PresentationType";
import { CSSProperties } from "react";
import { useAppActions } from "../../store/Hooks/useAppActions.ts";
import { SelectionType } from "../../store/EditorType.ts";

type ImageObjectProps = {
    imageObject: ImageContent,
    scale?: number,
    selection: SelectionType,
    readOnly: boolean,
    temporaryPosition?: { x: number, y: number } | null;
    temporarySize?: { width: number, height: number } | null;
}

const borderStyles: Record<string, CSSProperties> = {
    none: {}, // Без рамки
    'black-thick': {
        border: '10px solid black',
    },
    'black-thin': {
        border: '2px solid black',
    },
    'white-thick': {
        border: '10px solid white',
    },
    'white-thin': {
        border: '2px solid white',
    },
    'rounded-oval': {
        border: '3px solid black',
        borderRadius: '50%', // Овальная форма
    },
    'rounded-rect': {
        border: '3px solid black',
        borderRadius: '15px', // Сглаженные углы
    },
    'beveled-rect': {
        border: '3px solid black',
        clipPath: 'polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%, 0 10%)', // Скошенные углы
    },
};

function ImageObject({ imageObject, scale = 1, selection, readOnly, temporaryPosition, temporarySize }: ImageObjectProps) {
    const { setSelection } = useAppActions();
    const borderStyle = imageObject.borderStyle ?? 'none';

    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${(temporaryPosition?.y ?? imageObject.position.y) * scale}px`,
        left: `${(temporaryPosition?.x ?? imageObject.position.x) * scale}px`,
        width: `${(temporarySize?.width ?? imageObject.size.width) * scale}px`,
        height: `${(temporarySize?.height ?? imageObject.size.height) * scale}px`,
        zIndex: 3,
        ...borderStyles[borderStyle],
        border: !readOnly && selection.selectedObjectId === imageObject.id
            ? "3px solid #545557"
            : borderStyles[borderStyle]?.border || "none",
    };

    function onImageClick(imageObjectId: string) {
        setSelection({
            selectedSlideIds: selection.selectedSlideIds,
            selectedObjectId: imageObjectId,
        });
    }

    return (
        <img
            onClick={() => onImageClick(imageObject.id)}
            style={imageObjectStyles}
            src={`${imageObject.src}`}
            alt=""
        />
    );
}

export { ImageObject };