import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";


export const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,

})

export const rootStore = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.rootStore = rootStore