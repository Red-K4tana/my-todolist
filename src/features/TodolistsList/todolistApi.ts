import {AxiosResponse} from 'axios';
import {instance} from 'common/commonApi';
import {TaskPriorities, TaskStatuses } from 'common/commonEmuns';
import {ResponseServer} from 'common/types';


export const todolistAPI = {
	getTodolists() {
		return instance.get<Array<RespTodolist>>('todo-lists')
	},
	createTodolist(title: string) {
		return instance.post<{title: string}, AxiosResponse<ResponseServer<{item: RespTodolist}>>>('todo-lists', {title})
	},
	updateTodolist(todolistID: string, title: string) {
		return instance.put<ResponseServer>(`todo-lists/${todolistID}`, {title}) // почему-то серверу достаточно одного свойства
	},
	removeTodolist(todolistID: string) {
		return instance.delete<ResponseServer>(`todo-lists/${todolistID}`)
	},
	getTasks(todolistID: string) {
		return instance.get<TasksResponse>(`todo-lists/${todolistID}/tasks`)
	},
	createTask(todolistID: string, title: string) {
		return instance.post<{ title: string }, AxiosResponse<ResponseServer<{item: TaskItem}>>>(`todo-lists/${todolistID}/tasks`, {title})
	},
	updateTask(todolistID: string, taskID: string, model: UpdateTaskModel) {
		return instance.put<{ model: UpdateTaskModel }, AxiosResponse<ResponseServer<{item: TaskItem}>>>(`todo-lists/${todolistID}/tasks/${taskID}`, model) // здесь сервер просит полностью модель
	},
	removeTask(todolistID: string, taskID: string) {
		return instance.delete<ResponseServer>(`todo-lists/${todolistID}/tasks/${taskID}`)
	},
}


//types-todolists
export type RespTodolist = {
	id: string
	title: string
	addedDate: string
	order: number
}

export type TasksResponse ={
	error:null|string,
	totalCount:number,
	items:TaskItem[]
}

export type TaskItem = {
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

export type UpdateTaskModel = Omit<TaskItem, 'id' | 'todoListId' | 'order' | 'addedDate'>

