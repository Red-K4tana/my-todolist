import {v1} from "uuid";
import {AddTodolistAC, todolistID_1, todolistID_2, TODOLISTS_ACTION_NAME} from "./todolistsReducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [todolist_id: string]: Array<TaskType>
}

const initialState: TasksStateType = {
    [todolistID_1]: [
        {id: v1(), title: 'Buy beer', isDone: false},
        {id: v1(), title: 'Buy milk', isDone: false},
    ],
    [todolistID_2]: [
        {id: v1(), title: 'learn JS', isDone: true},
        {id: v1(), title: 'learn CSS', isDone: false},
    ]
}

// TASKS-REDUCER ======================================================================================================
export const tasksReducer = (tasks = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case TODOLISTS_ACTION_NAME.ADD_TODOLIST_ITEM: {
            return { ...tasks, [action.todolistID]: [] }
        }
        case TASKS_ACTION_NAME.ADD_TASK_ITEM: {
            const newTaskID = v1()
            return { ...tasks, [action.todolistID]: [{id: newTaskID, title: action.title, isDone: false}, ...tasks[action.todolistID]] }
        }
        default: {
            return tasks
        }
    }
}

// ACTION-CREATOR =====================================================================================================

export enum TASKS_ACTION_NAME {
    ADD_TASK_ITEM = 'task/ADD_TASK_ITEM',
    REMOVE_TASK_ITEM = 'task/REMOVE_TASK_ITEM',
    CHANGE_TASK_TITLE = 'task/CHANGE_TASK_TITLE',
    CHANGE_TASK_STATUS = 'task/CHANGE_TASK_STATUS',
}

type TasksActionType = AddTaskActionType | AddTodolistAC

type AddTaskActionType = {
    type: TASKS_ACTION_NAME.ADD_TASK_ITEM
    todolistID: string
    title: string
}

export const AddTaskAC = (todolistID: string, title: string): AddTaskActionType => {
    return {type: TASKS_ACTION_NAME.ADD_TASK_ITEM, todolistID, title} as const
}