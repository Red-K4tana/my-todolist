import {
    AddTodolistActionType,
    RemoveTodolistActionType, SetTodolistActionType,
    TODOLISTS_ACTION_TYPE_NAME
} from "./todolistsReducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../API/todolistAPI";
import {AppRootStateType, TypedDispatch} from "./store";



// ACTION-CREATOR =====================================================================================================

export enum TASKS_ACTION_TYPE_NAME {
    SET_TASKS = 'SET_TASKS',
    ADD_TASK_ITEM = 'task/ADD_TASK_ITEM',
    REMOVE_TASK_ITEM = 'task/REMOVE_TASK_ITEM',
    UPDATE_TASK = 'task/UPDATE_TASK',
}

export type TasksActionType =
    SetTodolistActionType
    | SetTasksActionType
    | AddTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | RemoveTaskActionType
    | UpdateTaskActionType

export type SetTasksActionType = {
    type: TASKS_ACTION_TYPE_NAME.SET_TASKS
    todolistID: string
    tasks: TaskType[]
}
export type AddTaskActionType = {
    type: TASKS_ACTION_TYPE_NAME.ADD_TASK_ITEM
    task: TaskType
}
export type RemoveTaskActionType = {
    type: TASKS_ACTION_TYPE_NAME.REMOVE_TASK_ITEM
    todolistID: string
    taskID: string
}
export type UpdateTaskActionType = {
    type: TASKS_ACTION_TYPE_NAME.UPDATE_TASK
    todolistID: string
    taskID: string
    task: TaskType
}

export const setTasksAC = (todolistID: string, tasks: TaskType[]): SetTasksActionType => {
    return {type: TASKS_ACTION_TYPE_NAME.SET_TASKS, todolistID, tasks} as const
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: TASKS_ACTION_TYPE_NAME.ADD_TASK_ITEM, task} as const
}
export const removeTaskAC = (todolistID: string, taskID: string): RemoveTaskActionType  => {
    return {type: TASKS_ACTION_TYPE_NAME.REMOVE_TASK_ITEM, todolistID, taskID} as const
}
export const updateTaskAC = (todolistID: string, taskID: string, task: TaskType): UpdateTaskActionType  => {
    return {type: TASKS_ACTION_TYPE_NAME.UPDATE_TASK, todolistID, taskID, task} as const
}
// THUNK CREATORS ======================================================================================================

export const getTasksTC = (todolistID: string) => (dispatch: TypedDispatch) => {
    todolistAPI.getTasks(todolistID)
        .then(res => {
            dispatch(setTasksAC(todolistID, res.data.items))
        })
}
export const addTaskTC = (todolistID: string, title: string) => (dispatch: TypedDispatch) => {
    todolistAPI.createTask(todolistID, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTaskTC = (todolistID: string, taskID: string, changeModel: updateDomainTaskModelType) => (dispatch: TypedDispatch, getState: ()=> AppRootStateType) => { // здесь мы достаем стэйт
    const state = getState()
    const task = state.tasks[todolistID].find(task => task.id === taskID)
    if (!task) {
        throw new Error ('task not found in the state')
        return
    }
    console.log('task ', task)
    const modelAPI: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...changeModel
    }
    console.log('modelAPI ', modelAPI)
    todolistAPI.updateTask(todolistID, taskID, modelAPI)
        .then(res => {
            dispatch(updateTaskAC(todolistID, taskID, res.data.data.item))
        })
}

export type updateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

// TASKS-REDUCER ======================================================================================================

export type TasksStateType = {
    [todolist_id: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const tasksReducer = (tasks = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case TODOLISTS_ACTION_TYPE_NAME.SET_TODOLISTS: {
            const copyTasks = {...tasks}
            action.RespTodolists.forEach(tl => {copyTasks [tl.id] = []})
            return copyTasks
        }
        case TASKS_ACTION_TYPE_NAME.SET_TASKS: {
            return {...tasks, [action.todolistID]: action.tasks}
        }
        case TODOLISTS_ACTION_TYPE_NAME.ADD_TODOLIST_ITEM: {
            return { ...tasks, [action.todolist.id]: [] }
        }
        case TASKS_ACTION_TYPE_NAME.ADD_TASK_ITEM: {
            return { ...tasks, [action.task.todoListId]: [action.task, ...tasks[action.task.todoListId]] }
        }
        case TODOLISTS_ACTION_TYPE_NAME.REMOVE_TODOLIST_ITEM: {
            const copyTasks = {...tasks}
            delete copyTasks[action.todolistID]
            return copyTasks
        }
        case TASKS_ACTION_TYPE_NAME.REMOVE_TASK_ITEM: {
            return {...tasks, [action.todolistID]: tasks[action.todolistID].filter(task => task.id !== action.taskID)}
        }
        case TASKS_ACTION_TYPE_NAME.UPDATE_TASK: {
            return {...tasks, [action.todolistID]: tasks[action.todolistID].map(t => t.id === action.taskID ? {...t, ...action.task} : t) }
        }
        default: {
            return tasks
        }
    }
}