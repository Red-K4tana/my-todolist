import axios from "axios";

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
    getTasks(todolistId: string) {
        return instance.get<any>(`/todo-lists/${todolistId}/tasks`)
    },
}

//types-todolists
export type RespTodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

