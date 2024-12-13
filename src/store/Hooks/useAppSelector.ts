import { TypedUseSelectorHook, useSelector } from "react-redux"
import { editorReducer } from "../../store/redux/editorReducer"

type RootState = ReturnType<typeof editorReducer>

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {
    useAppSelector,
}