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

export type ImageContent = BaseSlideObject & {
    type: 'image',
    src: string,
};