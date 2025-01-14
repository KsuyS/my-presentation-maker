import { Presentation } from './PresentationType.ts';

export type SelectionType = {
    selectedSlideIds: string[],
    selectedObjectId: string | null,
}

export type EditorType = {
    presentation: Presentation,
    selection: SelectionType,
    unsplash: {
        images: {
            data: string[];
            loading: boolean;
            error: string | null;
        };
        backgrounds: {
            data: string[];
            loading: boolean;
            error: string | null;
        };
    };
}
