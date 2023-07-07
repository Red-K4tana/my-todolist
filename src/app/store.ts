import {AnyAction, combineReducers} from 'redux';
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from "react-redux";
import {appReducer} from "./appReducer";
import {configureStore} from '@reduxjs/toolkit';
import {todolistsReducer} from 'features/TodolistsList/Todolist/todolistsReducer';
import {tasksReducer} from 'features/TodolistsList/Task/tasksReducer';
import {authReducer} from 'features/auth/authReducer';

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
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