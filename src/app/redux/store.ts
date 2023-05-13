import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistReducer, TodolistsActionType} from "./todolistsReducer";
import {TasksActionType, tasksReducer} from "./tasksReducer";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from "react-redux";
import {appReducer} from "./appReducer";
import {authReducer} from "./authReducer";
import {configureStore} from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

/*export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))*/
export type AppRootStateType = ReturnType<typeof rootReducer>

/*export type ActionsType = TodolistsActionType | TasksActionType | AppStateActionType | AuthActionType*/

//==============================================
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<TypedDispatch>()
//==============================================

// @ts-ignore
window.rootStore = store