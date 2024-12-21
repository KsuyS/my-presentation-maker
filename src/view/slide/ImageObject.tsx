import { ImageContent } from "../../store/PresentationType";
import { CSSProperties } from "react";
import { useAppActions } from "../../store/Hooks/useAppActions.ts";
import { SelectionType } from "../../store/EditorType.ts";

type ImageObjectProps = {
    imageObject: ImageContent,
    scale?: number,
    selection: SelectionType,
}

function ImageObject({ imageObject, scale = 1, selection }: ImageObjectProps) {

    const {setSelection} = useAppActions()

    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${imageObject.position.y * scale}px`,
        left: `${imageObject.position.x * scale}px`,
        width: `${imageObject.size.width * scale}px`,
        height: `${imageObject.size.height * scale}px`,
        zIndex: 3,
    };

    if (selection.selectedObjectId === imageObject.id) {
        imageObjectStyles.border = '3px solid #545557';
    }

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