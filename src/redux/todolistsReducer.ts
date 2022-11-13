import {v1} from "uuid";


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
        case TODOLISTS_ACTION_NAME.ADD_TODOLIST_ITEM: {
            return [{id: action.todolistID, title: action.title, filter: 'All'}, ...todolists]
        }
        default: {
            return todolists
        }
    }
}


// ACTION CREATOR =====================================================================================================
export enum TODOLISTS_ACTION_NAME {
    ADD_TODOLIST_ITEM = 'todolist/ADD_TODOLIST_ITEM',
    REMOVE_TODOLIST_ITEM = 'todolist/REMOVE_TODOLIST_ITEM',
    CHANGE_TODOLIST_TITLE = 'todolist/CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'todolist/CHANGE_TODOLIST_FILTER',
}

export type AddTodolistAC = {
    type: TODOLISTS_ACTION_NAME.ADD_TODOLIST_ITEM
    title: string
    todolistID: string
}

type TodolistsActionType = AddTodolistAC

export const AddTodolistAC = (todolistID: string, title: string) => {
  return {type: TODOLISTS_ACTION_NAME.ADD_TODOLIST_ITEM, todolistID, title} as const
}