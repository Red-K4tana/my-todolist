import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolistsReducer";


export const rootReducer = combineReducers({
    todolist: todolistReducer,

})

export const rootStore = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.rootStore = rootStore