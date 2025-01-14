import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'
import { editorReducer } from './editorReducer';

const store = createStore(editorReducer, applyMiddleware(thunk))

export {
    store
}