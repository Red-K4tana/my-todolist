import {v1} from "uuid";
import {AppRootStateType} from "./store";
import {ThunkDispatch} from 'redux-thunk';
import {todolistAPI} from "../API/todolistAPI";

export type TodolistFilterType = 'All' | 'Active' | 'Completed'

export type TodolistType = {
    id: string
    title: string
    filter: TodolistFilterType
}

export const todolistID_1 = v1()
export const todolistID_2 = v1()

const initialState: Array<TodolistType> = [
    {id: todolistID_1, title: 'todolist 1', filter: 'All'},
    {id: todolistID_2, title: 'todolist 2', filter: 'All'},
]

// TODOLIST-REDUCER ===================================================================================================
export const todolistReducer = (todolists = initialState, action: TodolistsActionType): Array<TodolistType> => {
    switch (action.type) {
        case TODOLISTS_ACTION_TYPE_NAME.ADD_TODOLIST_ITEM: {
            return [{id: action.todolistID, title: action.title, filter: 'All'}, ...todolists]
        }
        case TODOLISTS_ACTION_TYPE_NAME.REMOVE_TODOLIST_ITEM: {
            return todolists.filter(tl => tl.id !== action.todolistID)
        }
        case TODOLISTS_ACTION_TYPE_NAME.CHANGE_TODOLIST_TITLE: {
            return todolists.map(tl => tl.id === action.todolistID ? {...tl, title: action.newTitle} : tl)
        }
        case TODOLISTS_ACTION_TYPE_NAME.CHANGE_TODOLIST_FILTER: {
            return todolists.map(tl => tl.id === action.todolistID ? {...tl, filter: action.newFilter} : tl)
        }
        default: {
            return todolists
        }
    }
}


// ACTION CREATORS =====================================================================================================
export enum TODOLISTS_ACTION_TYPE_NAME {
    ADD_TODOLIST_ITEM = 'todolist/ADD_TODOLIST_ITEM',
    REMOVE_TODOLIST_ITEM = 'todolist/REMOVE_TODOLIST_ITEM',
    CHANGE_TODOLIST_TITLE = 'todolist/CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'todolist/CHANGE_TODOLIST_FILTER',
}

export type AddTodolistActionType = {
    type: TODOLISTS_ACTION_TYPE_NAME.ADD_TODOLIST_ITEM
    title: string
    todolistID: string
}
export type RemoveTodolistActionType = {
    type: TODOLISTS_ACTION_TYPE_NAME.REMOVE_TODOLIST_ITEM
    todolistID: string
}
export type ChangeTodolistTitleActionType = {
    type: TODOLISTS_ACTION_TYPE_NAME.CHANGE_TODOLIST_TITLE
    todolistID: string
    newTitle: string
}
export type ChangeTodolistFilterActionType = {
    type: TODOLISTS_ACTION_TYPE_NAME.CHANGE_TODOLIST_FILTER
    todolistID: string
    newFilter: TodolistFilterType
}

type TodolistsActionType =
    AddTodolistActionType
    | RemoveTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const AddTodolistAC = (todolistID: string, title: string) => {
  return {type: TODOLISTS_ACTION_TYPE_NAME.ADD_TODOLIST_ITEM, todolistID, title} as const
}
export const RemoveTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: TODOLISTS_ACTION_TYPE_NAME.REMOVE_TODOLIST_ITEM, todolistID} as const
}
export const ChangeTodolistTitleAC = (todolistID: string, newTitle: string): ChangeTodolistTitleActionType => {
    return {type: TODOLISTS_ACTION_TYPE_NAME.CHANGE_TODOLIST_TITLE, todolistID, newTitle} as const
}
export const ChangeTodolistFilterAC = (todolistID: string, newFilter: TodolistFilterType): ChangeTodolistFilterActionType => {
    return {type: TODOLISTS_ACTION_TYPE_NAME.CHANGE_TODOLIST_FILTER, todolistID, newFilter} as const
}
// THUNK CREATORS ======================================================================================================
export const getTodolistsTC = () => (dispatch: ThunkDispatchMe) => {
    todolistAPI.getTodolists()
        .then(res => {
            console.log(res.data)
        })
}

export type ThunkDispatchMe = ThunkDispatch<AppRootStateType, unknown, TodolistsActionType>