import { EditorType } from '../EditorType';

function MoveElementOnSlide(editor: EditorType, slideId: string, elementId: string, newX: number, newY: number): EditorType {
  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slides: editor.presentation.slides.map(slide =>
        slide.id === slideId
          ? {
              ...slide,
              content: slide.content.map(content =>
                content.id === elementId
                  ? { ...content, position: { x: newX, y: newY } }
                  : content
              ),
            }
          : slide
      ),
    },
  };
}

export { MoveElementOnSlide };