export type Presentation = {
    title: string,
    slides: SlidesCollection,
};

export type SlidesCollection = Array<Slide>;

export type Slide = {
    id: string,
    content: Array<SlideObject>,
    background: Background,
};

export type SolidBackground = {
    type: 'solid',
    color: string,
};

export type ImageBackground = {
    type: 'image',
    src: string,
};

export type GradientBackground = {
    type: 'gradient',
    gradient: string,
};

export type Background = SolidBackground | ImageBackground | GradientBackground;

export type SlideObject = TextContent | ImageContent;

export type BaseSlideObject = {
    id: string,
    position: {
        x: number,
        y: number;
    },
    size: {
        width: number,
        height: number,
    },
};

export type TextContent = BaseSlideObject & {
    type: 'text',
    value: string,
    fontFamily: string,
    fontSize: number,
    fontColor: string,
    textAlign: 'left' | 'center' | 'right',
    fontWeight: 'normal' | 'bold',
    fontStyle: 'normal' | 'italic',
    textDecoration: 'none' | 'underline',
    textCase: 'none' | 'capitalize' | 'uppercase' | 'lowercase',
};

export type BorderStyle = 
    | 'none' // Без рамки
    | 'black-thick' // Широкая черная рамка
    | 'black-thin' // Простая черная рамка
    | 'white-thick' // Широкая белая рамка
    | 'white-thin' // Простая белая рамка
    | 'rounded-oval' // Овал со сглаженными краями
    | 'rounded-rect' // Прямоугольник со сглаженными краями

export type ImageContent = BaseSlideObject & {
    type: 'image',
    src: string,
    borderStyle?: BorderStyle,
};