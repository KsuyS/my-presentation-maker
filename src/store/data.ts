import { Presentation } from "./PresentationType";
import { EditorType } from "./EditorType";

const presentation: Presentation = {
  title: "Новая презентация",
  slides: [
    {
      id: "slide1",
      content: [
      ],
      background: { type: 'solid', color: '#ffffff' },
    },
  ]
}

const data: EditorType = {
  presentation,
  selection: {
    selectedSlideIds: [presentation.slides[0].id],
    selectedObjectId: null,
  },
  unsplash: {
    images: {
      data: [],
      loading: false,
      error: null
    },
    backgrounds: {
      data: [],
      loading: false,
      error: null
    }
  }
}

export {
  data,
}