import {
	RespTodolistType,
	TaskPriorities,
	TaskStatuses,
	TaskType,
	todolistAPI,
	UpdateTaskModelType
} from 'api/todolistAPI';
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils';
import {appActions} from 'app/appReducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppRootStateType, TypedDispatch} from 'app/store';
import {todolistsActions} from 'features/TodolistsList/Todolist/todolistsReducer';



const getTasks = createAsyncThunk<{todolistID: string, tasks: TaskType[]}, string, { rejectValue: unknown }>('tasks/getTasks',
	async (todolistID, thunkAPI) => {
		const {dispatch, rejectWithValue} = thunkAPI
		dispatch(appActions.setAppStatus({status: 'loading'}))
		try {
			const res = await todolistAPI.getTasks(todolistID)
			dispatch(appActions.setAppStatus({status: 'succeeded'}))
			return {todolistID, tasks: res.data.items}
		} catch (err: any) {
			handleServerNetworkError(err.response.data.message, dispatch)
			return rejectWithValue(null)
		}
	})


export type TasksStateType = {
	[todolist_id: string]: Array<TaskType>
}
const initialState: TasksStateType = {}

const slice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
			state[action.payload.task.todoListId].unshift(action.payload.task)
		},
		removeTask: (state, action: PayloadAction<{ todolistID: string, taskID: string }>) => {
			state[action.payload.todolistID] = state[action.payload.todolistID]
				.filter(task => task.id !== action.payload.taskID)
		},
		updateTask: (state, action: PayloadAction<{ todolistID: string, taskID: string, task: TaskType }>) => {
			state[action.payload.todolistID] = state[action.payload.todolistID]
				.map(task => task.id === action.payload.taskID ? {...task, ...action.payload.task} : task)
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getTasks.fulfilled, (state, action) => {
				state[action.payload.todolistID] = action.payload.tasks
			})
			.addCase(todolistsActions.addTodolist, (state, action) => {
				state[action.payload.todolist.id] = []
			})
			.addCase(todolistsActions.removeTodolist, (state, action) => {
				delete state[action.payload.todolistID]
			})
			.addCase(todolistsActions.setTodolist, (state, action) => {
				action.payload.todolists.forEach(tl => state[tl.id] = [])
			})
			.addCase(todolistsActions.cleanerTodolists, (state, action) => {
				return {}
			})
	}
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = {getTasks}


// THUNK CREATORS ======================================================================================================
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
