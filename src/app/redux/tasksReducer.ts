import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from 'API/todolistAPI';
import {AppRootStateType, TypedDispatch} from "./store";
import {handleServerAppError, handleServerNetworkError} from 'app/common/error-untils';
import {appActions} from 'app/redux/appReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {todolistsActions} from "./todolistsReducer";

export type TasksStateType = {
	[todolist_id: string]: Array<TaskType>
}
const initialState: TasksStateType = {}

const slice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		setTasks: (state, action: PayloadAction<{todolistID: string, tasks: Array<TaskType>}>) => {
			state[action.payload.todolistID] = action.payload.tasks
			console.log('setTasks ', state[action.payload.todolistID])
		},
		addTask: (state, action: PayloadAction<{task: TaskType}>) => {
			state[action.payload.task.todoListId].unshift(action.payload.task)
			console.log('addTask ', state[action.payload.task.todoListId])
		},
		removeTask: (state, action: PayloadAction<{todolistID: string, taskID: string}>) => {
			let res = state[action.payload.todolistID].filter(task => task.id !== action.payload.taskID)
			state[action.payload.todolistID] = res
			console.log('removeTask ', state[action.payload.todolistID])
		},
		updateTask: (state, action: PayloadAction<{todolistID: string, taskID: string, task: TaskType}>) => {
			state[action.payload.todolistID].map(task => task.id === action.payload.taskID ? {...task, ...action.payload.task} : task)
			/*not worked*/
			console.log('updateTask ', state[action.payload.todolistID])
		},
	},
	extraReducers: builder => {
		builder
			.addCase(todolistsActions.addTodolist,
			(state, action) => {
				state[action.payload.todolist.id] = []
			})
			.addCase(todolistsActions.removeTodolist,
				(state, action) => {
				delete state[action.payload.todolistID]
			})
			.addCase(todolistsActions.setTodolist,
				(state, action) => {
				action.payload.todolists.forEach((tl) => state[tl.id] = [])
			})
	}
})
export const tasksReducer = slice.reducer
export const tasksActions = slice.actions

/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/
// ACTION-CREATOR ======================================================================================================
/*export enum TASKS_ACTION_TYPE_NAME {
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
export const removeTaskAC = (todolistID: string, taskID: string): RemoveTaskActionType => {
	return {type: TASKS_ACTION_TYPE_NAME.REMOVE_TASK_ITEM, todolistID, taskID} as const
}
export const updateTaskAC = (todolistID: string, taskID: string, task: TaskType): UpdateTaskActionType => {
	return {type: TASKS_ACTION_TYPE_NAME.UPDATE_TASK, todolistID, taskID, task} as const
}*/
/*// TASKS-REDUCER ======================================================================================================
export const tasksReducer = (tasks = initialState, action: TasksActionType): TasksStateType => {
	switch (action.type) {
		case TODOLISTS_ACTION_TYPE_NAME.SET_TODOLISTS: {
			const copyTasks = {...tasks}
			action.RespTodolists.forEach(tl => {
				copyTasks [tl.id] = []
			})
			return copyTasks
		}
		case TASKS_ACTION_TYPE_NAME.SET_TASKS: {
			return {...tasks, [action.todolistID]: action.tasks}
		}
		case TODOLISTS_ACTION_TYPE_NAME.ADD_TODOLIST_ITEM: {
			return {...tasks, [action.todolist.id]: []}
		}
		case TASKS_ACTION_TYPE_NAME.ADD_TASK_ITEM: {
			return {...tasks, [action.task.todoListId]: [action.task, ...tasks[action.task.todoListId]]}
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
			return {
				...tasks,
				[action.todolistID]: tasks[action.todolistID].map(t => t.id === action.taskID ? {...t, ...action.task} : t)
			}
		}
		default: {
			return tasks
		}
	}
}*/
/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/

// THUNK CREATORS ======================================================================================================
export const getTasksTC = (todolistID: string) => (dispatch: TypedDispatch) => {
	dispatch(appActions.setAppStatus({status: 'loading'}))
	todolistAPI.getTasks(todolistID)
		.then(res => {
			dispatch(tasksActions.setTasks({todolistID, tasks: res.data.items}))
			dispatch(appActions.setAppStatus({status: 'succeeded'}))
		})
		.catch(error => {
			handleServerNetworkError(error.response.data.message, dispatch)
		})
}
export const addTaskTC = (todolistID: string, title: string) => (dispatch: TypedDispatch) => {
	dispatch(appActions.setAppStatus({status: 'loading'}))
	todolistAPI.createTask(todolistID, title)
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(tasksActions.addTask({task: res.data.data.item}))
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch(error => {
			handleServerNetworkError(error.message, dispatch)
		})
}
export const updateTaskTC = (todolistID: string, taskID: string, changeModel: updateDomainTaskModelType) =>
	(dispatch: TypedDispatch, getState: () => AppRootStateType) => { // здесь мы достаем стэйт
		dispatch(appActions.setAppStatus({status: 'loading'}))
		const state = getState()
		const task = state.tasks[todolistID].find(task => task.id === taskID)
		if (!task) {
			throw new Error('task not found in the state')
			return
		}
		const modelAPI: UpdateTaskModelType = {
			title: task.title,
			description: task.description,
			status: task.status,
			priority: task.priority,
			startDate: task.startDate,
			deadline: task.deadline,
			...changeModel
		}
		todolistAPI.updateTask(todolistID, taskID, modelAPI)
			.then(res => {
				if (res.data.resultCode === 0) {
					dispatch(tasksActions.updateTask({todolistID, taskID, task: res.data.data.item})) // item это таска, я ее отправляю в редьюсер
					dispatch(appActions.setAppStatus({status: 'succeeded'}))
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
			.catch(error => {
				handleServerNetworkError(error.message, dispatch)
			})
	}
export const removeTaskTC = (todolistID: string, taskID: string) => (dispatch: TypedDispatch) => {
	dispatch(appActions.setAppStatus({status: 'loading'}))
	todolistAPI.removeTask(todolistID, taskID)
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(tasksActions.removeTask({todolistID, taskID}))
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch(error => {
			handleServerNetworkError(error.message, dispatch)
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
