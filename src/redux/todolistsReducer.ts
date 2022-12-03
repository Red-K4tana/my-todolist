import {TypedDispatch} from "./store";
import {todolistAPI, RespTodolistType} from "../API/todolistAPI";
import {getTasksTC} from "./tasksReducer";

// ACTION CREATORS =====================================================================================================
export enum TODOLISTS_ACTION_TYPE_NAME {
    SET_TODOLISTS = 'todolist/SET_TODOLIST',
    ADD_TODOLIST_ITEM = 'todolist/ADD_TODOLIST_ITEM',
    REMOVE_TODOLIST_ITEM = 'todolist/REMOVE_TODOLIST_ITEM',
    CHANGE_TODOLIST_TITLE = 'todolist/CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'todolist/CHANGE_TODOLIST_FILTER',
}

export type SetTodolistActionType = {
    type: TODOLISTS_ACTION_TYPE_NAME.SET_TODOLISTS
    RespTodolists: RespTodolistType[]
}
export type AddTodolistActionType = {
    type: TODOLISTS_ACTION_TYPE_NAME.ADD_TODOLIST_ITEM
    todolist: RespTodolistType
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

export type TodolistsActionType =
    SetTodolistActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const setTodolistAC = (RespTodolists: RespTodolistType[]): SetTodolistActionType => {
    return {type: TODOLISTS_ACTION_TYPE_NAME.SET_TODOLISTS, RespTodolists} as const
}
export const addTodolistAC = (todolist: RespTodolistType): AddTodolistActionType => {
  return {type: TODOLISTS_ACTION_TYPE_NAME.ADD_TODOLIST_ITEM, todolist} as const
}
export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: TODOLISTS_ACTION_TYPE_NAME.REMOVE_TODOLIST_ITEM, todolistID} as const
}
export const changeTodolistTitleAC = (todolistID: string, newTitle: string): ChangeTodolistTitleActionType => {
    return {type: TODOLISTS_ACTION_TYPE_NAME.CHANGE_TODOLIST_TITLE, todolistID, newTitle} as const
}
export const changeTodolistFilterAC = (todolistID: string, newFilter: TodolistFilterType): ChangeTodolistFilterActionType => {
    return {type: TODOLISTS_ACTION_TYPE_NAME.CHANGE_TODOLIST_FILTER, todolistID, newFilter} as const
}
// THUNK CREATORS ======================================================================================================

export const getTodolistsTC = () => (dispatch: TypedDispatch) => {
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistAC(res.data))
            return res.data
        })
        .then(todolists => {
            todolists.forEach(tl => dispatch(getTasksTC(tl.id)))
        })
}
export const addTodolistTC = (title: string) => (dispatch: TypedDispatch) => {
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC = (todolistID: string, title: string) => (dispatch: TypedDispatch) => {
    todolistAPI.updateTodolist(todolistID, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todolistID, title))
        })
}
export const removeTodolistTC = (todolistID: string) => (dispatch: TypedDispatch) => {
    todolistAPI.removeTodolist(todolistID)
        .then(res => {
            dispatch(removeTodolistAC(todolistID))
        })
}

// TODOLIST-REDUCER ===================================================================================================
export type TodolistFilterType = 'All' | 'Active' | 'Completed'

export type TodolistStateType = RespTodolistType & { filter: TodolistFilterType }

const initialState: Array<TodolistStateType> = []
export const todolistReducer = (todolists = initialState, action: TodolistsActionType): Array<TodolistStateType> => {
    switch (action.type) {
        case TODOLISTS_ACTION_TYPE_NAME.SET_TODOLISTS: {
            return action.RespTodolists.map(todolist => ({...todolist, filter: 'All'}))
        }
        case TODOLISTS_ACTION_TYPE_NAME.ADD_TODOLIST_ITEM: {
            return [{...action.todolist, filter: 'All'}, ...todolists]
        }
        case TODOLISTS_ACTION_TYPE_NAME.REMOVE_TODOLIST_ITEM: {
            return todolists.filter(tl => tl.id !== action.todolistID)
        }
        case TODOLISTS_ACTION_TYPE_NAME.CHANGE_TODOLIST_TITLE: {
            return todolists.map(tl => tl.id === action.todolistID ? {...tl, title: action.newTitle} : tl)
        }
        default: {
            return todolists
        }
    }
}