import {v1} from "uuid";


type TodolistFilterType = 'All' | 'Active' | 'Completed'

type TodolistType = {
    id: string
    title: string
    filter: TodolistFilterType
}

const todolistID_1 = v1()
const todolistID_2 = v1()

const initialState: Array<TodolistType> = [
    {id: todolistID_1, title: 'todolist 1', filter: 'All'},
    {id: todolistID_2, title: 'todolist 2', filter: 'All'},
]

// TODOLIST-REDUCER ===================================================================================================
export const todolistReducer = (initialState, action): Array<TodolistType> => {
    
}


// ACTION CREATOR =====================================================================================================
enum TODOLIST_ACTION_NAME {
    ADD_TODOLIST = 'todolist/ADD_ITEM',
    REMOVE_TODOLIST = 'todolist/REMOVE_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'todolist/CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'todolist/CHANGE_TODOLIST_FILTER',
}



export type TodolistActionType =

export const AddTodolistAC = (newTitle: string) => {
  return {type: TODOLIST_ACTION_NAME.ADD_TODOLIST, newTitle} as const
}