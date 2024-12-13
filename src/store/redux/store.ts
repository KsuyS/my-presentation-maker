import { legacy_createStore as createStore } from "redux";
import { editorReducer } from "./editorReducer";

const store = createStore(editorReducer)

export {
    store
}

// import { combineReducers } from 'redux';
// import { editorReducer } from './editorReducer';
// import { legacy_createStore as createStore } from "redux";

// const rootReducer = combineReducers({
//     editor: editorReducer,
// });

// export type RootState = ReturnType<typeof rootReducer>;

// export const store = createStore(rootReducer);
