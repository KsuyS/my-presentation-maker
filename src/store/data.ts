import {Presentation} from "./PresentationType.ts";
import {EditorType} from "./EditorType.ts";

const presentation: Presentation = {
    title: "Новая презентация",
    slides: [
      {
        id: "slide1",
        content: [
          {
            type: 'text',
            id: "text1",
            position: { x: 100, y: 100 },
            size: { width: 100, height: 50 },
            value: "Welcome!",
            fontFamily: "Arial",
            fontSize: 20,
            fontColor: "black",
          },
          {
            type: 'image',
            id: "image1",
            position: { x: 150, y: 200 },
            size: { width: 150, height: 150 },
            src: './cat.png',
          }
        ],
        background: { type: 'solid', color: '#e6e8e6' },
      },
      {
        id: "slide2",
        content: [],
        background: { type: 'solid', color: '#bdbfb2' },
      },
      {
        id: "slide3",
        content: [],
        background: { type: 'image', src: './background.png' },
      },
    ]
  }

  const editor: EditorType = {
    presentation,
    selection: {
        selectedSlideId: presentation.slides[0].id,
        selectedObjectId: null
    }
}

export {
    editor,
}