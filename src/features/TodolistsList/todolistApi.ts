import {AxiosResponse} from 'axios';
import {ResponseType, RespTodolistType, TasksResponseType, TaskType, UpdateTaskModelType} from 'common/commonApi/commonApi';

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