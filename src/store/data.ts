import {Presentation} from "./PresentationType";
import {EditorType} from "./EditorType";

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
        ],
        background: { type: 'solid', color: '#e6e8e6' },
      },
      {
        id: "slide2",
        content: [],
        background: { type: 'solid', color: '#bdbfb2' },
      },
    ]
  }

  const data: EditorType = {
    presentation,
    selection: {
        selectedSlideId: presentation.slides[0].id,
        selectedObjectId: null
    }
}

export {
  data,
}