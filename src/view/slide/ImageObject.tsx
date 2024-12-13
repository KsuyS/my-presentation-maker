import { ImageContent } from "../../store/PresentationType";
import { CSSProperties } from "react";
import {dispatch} from "../../store/editor.ts";
import { setSelection } from "../../store/SetSelection.ts";
import { SelectionType } from "../../store/EditorType.ts";

type ImageObjectProps = {
    imageObject: ImageContent,
    scale?: number,
    selection: SelectionType,
}

function ImageObject({ imageObject, scale = 1, selection }: ImageObjectProps) {
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
    const onImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
        dispatch(setSelection, {
            selectedSlideId: selection.selectedSlideId,
            selectedObjectId: imageObject.id,
        });
    };
    

    return (
        <img onClick={onImageClick} style={imageObjectStyles} src={`data:image/jpeg;base64, ${imageObject.src}`}/>
    )
}

export {
    ImageObject,
};