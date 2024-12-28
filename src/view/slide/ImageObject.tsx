import { ImageContent } from "../../store/PresentationType";
import { CSSProperties } from "react";
import { useAppActions } from "../../store/Hooks/useAppActions.ts";
import { SelectionType } from "../../store/EditorType.ts";

type ImageObjectProps = {
    imageObject: ImageContent,
    scale?: number,
    selection: SelectionType,
    readOnly: boolean,
}

function ImageObject({ imageObject, scale = 1, selection, readOnly }: ImageObjectProps) {

    const {setSelection} = useAppActions()

    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${imageObject.position.y * scale}px`,
        left: `${imageObject.position.x * scale}px`,
        width: `${imageObject.size.width * scale}px`,
        height: `${imageObject.size.height * scale}px`,
        zIndex: 3,
        border: !readOnly && selection.selectedObjectId === imageObject.id
            ? "3px solid #545557"
            : "none",
    };

 

    function onImageClick(imageObjectId: string) {
        setSelection({
            selectedSlideId: selection.selectedSlideId,
            selectedObjectId: imageObjectId,
        })
    }
    

    return (
        <img onClick={() => onImageClick(imageObject.id)} style={imageObjectStyles} src={`${imageObject.src}`}/>
    )
}

export {
    ImageObject,
};