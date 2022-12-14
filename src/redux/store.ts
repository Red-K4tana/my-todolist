import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer, TodolistsActionType} from "./todolistsReducer";
import {TasksActionType, tasksReducer} from "./tasksReducer";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from "react-redux";
import {appReducer, AppStateActionType} from "./appReducer";
import {AuthActionType, authReducer} from "./authReducer";

export const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})

export const rootStore = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof rootReducer>

export type ActionsType = TodolistsActionType | TasksActionType | AppStateActionType | AuthActionType

//==============================================
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, ActionsType>
export const useAppDispatch = () => useDispatch<TypedDispatch>()
//==============================================

// @ts-ignore
window.rootStore = rootStore