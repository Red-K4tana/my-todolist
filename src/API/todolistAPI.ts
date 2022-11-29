import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '9bad4dc1-4f5c-485a-93a2-c73a0c7180c8',
    },
})



export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<RespTodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<{title: string}, AxiosResponse<ResponseType<{item: RespTodolistType}>>>('todo-lists', {title})
    },
    updateTodolist(todolistID: string, title: string) {
        return instance.put<AxiosResponse<ResponseType>>(`todo-lists/${todolistID}`, {title}) // почему то серверу достаточно одного свойства
    },
    getTasks(todolistID: string) {
        return instance.get<TasksResponseType>(`todo-lists/${todolistID}/tasks`)
    },
    createTask(todolistID: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{item: TaskType}>>>(`todo-lists/${todolistID}/tasks`, {title})
    },
    updateTask(todolistID: string, taskID: string, model: string) {
        instance.put<any>(`todo-lists/${todolistID}/tasks/${taskID}`, {model}) // здесь сервер просит полностью модель
    },

}

//types-todolists
//такой тип приходит пустым и с resultCode: 1, когда какая-то проблема
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export type RespTodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TasksResponseType={
    error:null|string,
    totalCount:number,
    items:TaskType[]

}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
