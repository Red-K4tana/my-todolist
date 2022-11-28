import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType, SetTodolistActionType,
    todolistID_1,
    todolistID_2,
    TODOLISTS_ACTION_TYPE_NAME
} from "./todolistsReducer";
import {TaskType, todolistAPI} from "../API/todolistAPI";
import {TypedDispatch} from "./store";


/*export type TaskType = {
    id: string
    title: string
    isDone: boolean
}*/
export type TasksStateType = {
    [todolist_id: string]: Array<TaskType>
}

const initialState: TasksStateType = {
/*    [todolistID_1]: [
        {id: v1(), title: 'Buy beer', isDone: false},
        {id: v1(), title: 'Buy milk', isDone: false},
    ],
    [todolistID_2]: [
        {id: v1(), title: 'learn JS', isDone: true},
        {id: v1(), title: 'learn CSS', isDone: false},
    ]*/
}

// TASKS-REDUCER ======================================================================================================
export const tasksReducer = (tasks = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case TODOLISTS_ACTION_TYPE_NAME.SET_TODOLISTS: {
            const copyTasks = {...tasks}
            action.RespTodolists.forEach(tl => ({...copyTasks, [tl.id]: []}))
            console.log('set empty array in tasks ', copyTasks)
            return copyTasks
        }
        case TASKS_ACTION_TYPE_NAME.SET_TASKS: {
            return {...tasks, [action.todolistID]: action.tasks}
        }
        case TODOLISTS_ACTION_TYPE_NAME.ADD_TODOLIST_ITEM: {
            return { ...tasks, [action.todolistID]: [] }
        }
        case TODOLISTS_ACTION_TYPE_NAME.REMOVE_TODOLIST_ITEM: {
            const copyTasks = {...tasks}
            delete copyTasks[action.todolistID]
            return copyTasks
        }
        case TASKS_ACTION_TYPE_NAME.ADD_TASK_ITEM: {
            const newTaskID = v1()
            return { ...tasks, [action.todolistID]: [{id: newTaskID, title: action.title, isDone: false}, ...tasks[action.todolistID]] }
        }
        case TASKS_ACTION_TYPE_NAME.REMOVE_TASK_ITEM: {
            return {...tasks, [action.todolistID]: tasks[action.todolistID].filter(task => task.id !== action.taskID)}
        }
        case TASKS_ACTION_TYPE_NAME.CHANGE_TASK_TITLE: {
            return {...tasks, [action.todolistID]: tasks[action.todolistID].map(task => task.id === action.taskID ? {...task, title: action.newTitle} : task)}
        }
        case TASKS_ACTION_TYPE_NAME.CHANGE_TASK_STATUS: {
            return {...tasks, [action.todolistID]: tasks[action.todolistID].map(task => task.id === action.taskID ? {...task, isDone: action.newStatus} : task)}
        }
        default: {
            return tasks
        }
    }
}

// ACTION-CREATOR =====================================================================================================

export enum TASKS_ACTION_TYPE_NAME {
    SET_TASKS = 'SET_TASKS',
    ADD_TASK_ITEM = 'task/ADD_TASK_ITEM',
    REMOVE_TASK_ITEM = 'task/REMOVE_TASK_ITEM',
    CHANGE_TASK_TITLE = 'task/CHANGE_TASK_TITLE',
    CHANGE_TASK_STATUS = 'task/CHANGE_TASK_STATUS',
}

export type TasksActionType =
    SetTodolistActionType
    | SetTasksActionType
    | AddTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | RemoveTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType

export type SetTasksActionType = {
    type: TASKS_ACTION_TYPE_NAME.SET_TASKS
    todolistID: string
    tasks: TaskType[]
}
export type AddTaskActionType = {
    type: TASKS_ACTION_TYPE_NAME.ADD_TASK_ITEM
    todolistID: string
    title: string
}
export type RemoveTaskActionType = {
    type: TASKS_ACTION_TYPE_NAME.REMOVE_TASK_ITEM
    todolistID: string
    taskID: string
}
export type ChangeTaskTitleActionType = {
    type: TASKS_ACTION_TYPE_NAME.CHANGE_TASK_TITLE
    todolistID: string
    taskID: string
    newTitle: string
}
export type ChangeTaskStatusActionType = {
    type: TASKS_ACTION_TYPE_NAME.CHANGE_TASK_STATUS
    todolistID: string
    taskID: string
    newStatus: boolean
}
export const SetTasksAC = (todolistID: string, tasks: TaskType[]): SetTasksActionType => {
    return {type: TASKS_ACTION_TYPE_NAME.SET_TASKS, todolistID, tasks} as const
}
export const AddTaskAC = (todolistID: string, title: string): AddTaskActionType => {
    return {type: TASKS_ACTION_TYPE_NAME.ADD_TASK_ITEM, todolistID, title} as const
}
export const RemoveTaskAC = (todolistID: string, taskID: string): RemoveTaskActionType  => {
    return {type: TASKS_ACTION_TYPE_NAME.REMOVE_TASK_ITEM, todolistID, taskID} as const
}
export const ChangeTaskTitleAC = (todolistID: string, taskID: string, newTitle: string): ChangeTaskTitleActionType  => {
    return {type: TASKS_ACTION_TYPE_NAME.CHANGE_TASK_TITLE, todolistID, taskID, newTitle} as const
}
export const ChangeTaskStatusAC = (todolistID: string, taskID: string, newStatus: boolean): ChangeTaskStatusActionType  => {
    return {type: TASKS_ACTION_TYPE_NAME.CHANGE_TASK_STATUS, todolistID, taskID, newStatus} as const
}
// THUNK CREATORS ======================================================================================================
export const SetTasksTC = (todolistID: string) => (dispatch: TypedDispatch) => {
    todolistAPI.getTasks(todolistID)
        .then(res => {
            console.log('tasks ', res.data)
            dispatch(SetTasksAC(todolistID, res.data.items))
        })
}