import { importImageFromUnsplash } from '../../utils/UnsplashUtils';
import { ActionType } from './actions';
import { Dispatch } from 'redux';

export const fetchUnsplashImages = (query: string) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.FETCH_UNSPLASH_IMAGES_REQUEST,
            payload: query
        });

        try {
            const images = await importImageFromUnsplash(query);
            dispatch({
                type: ActionType.FETCH_UNSPLASH_IMAGES_SUCCESS,
                payload: images
            });
        } catch (error: unknown) {
            let errorMessage = 'Произошла ошибка при загрузке изображений';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            dispatch({
                type: ActionType.FETCH_UNSPLASH_IMAGES_FAILURE,
                payload: errorMessage
            });
        }
    };
};

export const fetchUnsplashBackgrounds = (query: string) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.FETCH_UNSPLASH_BACKGROUNDS_REQUEST,
            payload: query
        });

        try {
            const images = await importImageFromUnsplash(query);
            dispatch({
                type: ActionType.FETCH_UNSPLASH_BACKGROUNDS_SUCCESS,
                payload: images
            });
        } catch (error: unknown) {
            let errorMessage = 'Произошла ошибка при загрузке фоновых изображений';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            dispatch({
                type: ActionType.FETCH_UNSPLASH_BACKGROUNDS_FAILURE,
                payload: errorMessage
            });
        }
    };
};