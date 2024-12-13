import * as SlideActionCreators from './slideActionCreators'
import * as SelectionActionCreators from './selectionActionCreators'
import * as EditorActionCreators from './editorActionCreators'

export default {
    ...SlideActionCreators,
    ...SelectionActionCreators,
    ...EditorActionCreators,
}