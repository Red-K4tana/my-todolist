import {
	TaskPriorities,
	TaskStatuses,
	TaskType,
	todolistAPI,
	UpdateTaskModelType
} from 'api/todolistAPI';
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils';
import {appActions} from 'app/appReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppRootStateType, TypedDispatch} from 'app/store';
import {todolistsActions} from 'features/TodolistsList/Todolist/todolistsReducer';
import {createAppAsyncThunk} from 'utils/create-app-async-thunk';


const getTasks = createAppAsyncThunk<{ todolistID: string, tasks: TaskType[] }, string>('tasks/getTasks',
	async (todolistID, thunkAPI) => {
		const {dispatch, rejectWithValue} = thunkAPI
		dispatch(appActions.setAppStatus({status: 'loading'}))
		try {
			const res = await todolistAPI.getTasks(todolistID)
			dispatch(appActions.setAppStatus({status: 'succeeded'}))
			return {todolistID, tasks: res.data.items}
		} catch (err) {
			handleServerNetworkError(err, dispatch)
			return rejectWithValue(null)
		}
	})

const addTask = createAppAsyncThunk<TaskType, { todolistID: string, title: string }>('tasks/addTask',
	async ({todolistID, title}, thunkAPI) => {
		const {dispatch, rejectWithValue} = thunkAPI
		dispatch(appActions.setAppStatus({status: 'loading'}))
		try {
			const res = await todolistAPI.createTask(todolistID, title)
			dispatch(appActions.setAppStatus({status: 'succeeded'}))
			return res.data.data.item
		} catch (err) {
			handleServerNetworkError(err, dispatch)
			return rejectWithValue(null)
		}
	})
const removeTask = createAppAsyncThunk<{todolistID: string, taskID: string}, {todolistID: string, taskID: string}>('tasks/removeTask',
	async ({todolistID, taskID}, thunkAPI) => {
	const {dispatch, rejectWithValue} = thunkAPI
		dispatch(appActions.setAppStatus({status: 'loading'}))
		try {
			const res = await todolistAPI.removeTask(todolistID, taskID)
			if (res.data.resultCode === 0) {
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
				return {todolistID, taskID}
			} else {
				handleServerAppError(res.data, dispatch)
				return rejectWithValue(null)
			}
		} catch (err) {
			handleServerNetworkError(err, dispatch)
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
			.addCase(addTask.fulfilled, (state, action) => {
				state[action.payload.todoListId].unshift(action.payload)
			})
			.addCase(removeTask.fulfilled, (state, action) => {
				state[action.payload.todolistID] = state[action.payload.todolistID]
					.filter(task => task.id !== action.payload.taskID)
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
			.addCase(todolistsActions.cleanerTodolists, () => {
				return {}
			})
	}
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = {getTasks, addTask, removeTask}


// THUNK CREATORS ======================================================================================================

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


export type updateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}
