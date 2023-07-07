import {AxiosResponse} from 'axios';
import {
	instance,
	TaskPriorities,
	TaskStatuses,
} from 'common/commonApi/commonApi';

export const todolistAPI = {
	getTodolists() {
		return instance.get<Array<RespTodolistType>>('todo-lists')
	},
	createTodolist(title: string) {
		return instance.post<{title: string}, AxiosResponse<ResponseType<{item: RespTodolistType}>>>('todo-lists', {title})
	},
	updateTodolist(todolistID: string, title: string) {
		return instance.put<ResponseType>(`todo-lists/${todolistID}`, {title}) // почему то серверу достаточно одного свойства
	},
	removeTodolist(todolistID: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
	},
	getTasks(todolistID: string) {
		return instance.get<TasksResponseType>(`todo-lists/${todolistID}/tasks`)
	},
	createTask(todolistID: string, title: string) {
		return instance.post<{ title: string }, AxiosResponse<ResponseType<{item: TaskType}>>>(`todo-lists/${todolistID}/tasks`, {title})
	},
	updateTask(todolistID: string, taskID: string, model: UpdateTaskModelType) {
		return instance.put<{ model: UpdateTaskModelType }, AxiosResponse<ResponseType<{item: TaskType}>>>(`todo-lists/${todolistID}/tasks/${taskID}`, model) // здесь сервер просит полностью модель
	},
	removeTask(todolistID: string, taskID: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
	},
}


//types-todolists
//this type comes is empty and with 'resultCode: 1', when some problem
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
export type UpdateTaskModelType = {
	title: string
	description: string
	status: TaskStatuses
	priority: TaskPriorities
	startDate: string
	deadline: string
}