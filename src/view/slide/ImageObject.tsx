import { ImageContent, BorderStyle } from "../../store/PresentationType";
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


interface BorderStyleDefinition {
    width?: number;
    color?: string;
    borderRadius?: number | string;
    clipPath?: string;
}


const borderStyles: Record<BorderStyle, BorderStyleDefinition> = {
    none: {},
    'black-thick': {
        width: 10,
        color: 'black',
        borderRadius: 0,
    },
    'black-thin': {
        width: 2,
        color: 'black',
        borderRadius: 0,
    },
    'white-thick': {
        width: 10,
        color: 'white',
        borderRadius: 0,
    },
    'white-thin': {
        width: 2,
        color: 'white',
        borderRadius: 0,
    },
    'rounded-oval': {
        width: 3,
        color: 'black',
        borderRadius: '50%',
    },
    'rounded-rect': {
        width: 2,
        color: 'black',
        borderRadius: 15,
    },
};

function ImageObject({ imageObject, scale = 1, selection, readOnly, temporaryPosition, temporarySize }: ImageObjectProps) {
    const { setSelection } = useAppActions();
    const borderStyle = imageObject.borderStyle ?? 'none';

    const borderDefinition = borderStyles[borderStyle];

    const calculatedBorderStyle = borderDefinition?.width ? `${borderDefinition.width * scale}px solid ${borderDefinition.color || 'black'}` : 'none';
    const calculatedBorderRadiusStyle = typeof borderDefinition?.borderRadius === 'number' ? `${borderDefinition.borderRadius * scale}px` : borderDefinition?.borderRadius || '0';

    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${(temporaryPosition?.y ?? imageObject.position.y) * scale}px`,
        left: `${(temporaryPosition?.x ?? imageObject.position.x) * scale}px`,
        width: `${(temporarySize?.width ?? imageObject.size.width) * scale}px`,
        height: `${(temporarySize?.height ?? imageObject.size.height) * scale}px`,
        zIndex: 3,
        border: !readOnly && selection.selectedObjectId === imageObject.id
            ? `3px solid #545557`
            : calculatedBorderStyle,
        borderRadius: calculatedBorderRadiusStyle,
        clipPath: borderDefinition?.clipPath || 'none',
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