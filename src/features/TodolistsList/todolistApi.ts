import {AxiosResponse} from 'axios';
import {instance} from 'common/commonApi';
import {TaskPriorities, TaskStatuses } from 'common/commonEmuns';
import {ResponseServerType} from 'common/types';


export const todolistAPI = {
	getTodolists() {
		return instance.get<Array<RespTodolistType>>('todo-lists')
	},
	createTodolist(title: string) {
		return instance.post<{title: string}, AxiosResponse<ResponseServerType<{item: RespTodolistType}>>>('todo-lists', {title})
	},
	updateTodolist(todolistID: string, title: string) {
		return instance.put<ResponseServerType>(`todo-lists/${todolistID}`, {title}) // почему то серверу достаточно одного свойства
	},
	removeTodolist(todolistID: string) {
		return instance.delete<ResponseServerType>(`todo-lists/${todolistID}`)
	},
	getTasks(todolistID: string) {
		return instance.get<TasksResponseType>(`todo-lists/${todolistID}/tasks`)
	},
	createTask(todolistID: string, title: string) {
		return instance.post<{ title: string }, AxiosResponse<ResponseServerType<{item: TaskType}>>>(`todo-lists/${todolistID}/tasks`, {title})
	},
	updateTask(todolistID: string, taskID: string, model: UpdateTaskModelType) {
		return instance.put<{ model: UpdateTaskModelType }, AxiosResponse<ResponseServerType<{item: TaskType}>>>(`todo-lists/${todolistID}/tasks/${taskID}`, model) // здесь сервер просит полностью модель
	},
	removeTask(todolistID: string, taskID: string) {
		return instance.delete<ResponseServerType>(`todo-lists/${todolistID}/tasks/${taskID}`)
	},
}


//types-todolists
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
export type UpdateTaskModelType = {
	title: string
	description: string
	status: TaskStatuses
	priority: TaskPriorities
	startDate: string
	deadline: string
}