import {appActions} from 'app/appReducer';
import {createSlice} from '@reduxjs/toolkit';
import {todolistsActions, todolistsThunks} from 'features/TodolistsList/Todolist/todolistsReducer';
import {createAppAsyncThunk, handleServerAppError, thunkTryCatch} from 'common/utils';
import {TaskType, todolistAPI, UpdateTaskModelType} from 'features/TodolistsList/todolistApi';
import {handleServerNetworkError} from 'common/utils/error-utils';
import {ResultCode, TaskPriorities, TaskStatuses} from 'common/commonEmuns';


// THUNK CREATORS ======================================================================================================
export type updateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}

const getTasks = createAppAsyncThunk<{ todolistID: string, tasks: TaskType[] }, string>(
	'tasks/getTasks', async (todolistID, thunkAPI) => {
		return thunkTryCatch(thunkAPI, async () => {
			const res = await todolistAPI.getTasks(todolistID)
			return {todolistID, tasks: res.data.items}
		})
	})

const addTask = createAppAsyncThunk<{ taskItem: TaskType }, { todolistID: string, title: string }>('tasks/addTask',
	async ({todolistID, title}, thunkAPI) => {
		const {dispatch, rejectWithValue} = thunkAPI
		return thunkTryCatch(thunkAPI, async () => {
			const res = await todolistAPI.createTask(todolistID, title)
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
				return {taskItem: res.data.data.item}
			} else {
				handleServerAppError(res.data, dispatch)
				rejectWithValue(null)
			}
		})
	})
const removeTask = createAppAsyncThunk<{ todolistID: string, taskID: string },
	{ todolistID: string, taskID: string }>('tasks/removeTask',
	async ({todolistID, taskID}, thunkAPI) => {
		const {dispatch, rejectWithValue} = thunkAPI
		dispatch(appActions.setAppStatus({status: 'loading'}))
		try {
			const res = await todolistAPI.removeTask(todolistID, taskID)
			if (res.data.resultCode === ResultCode.Success) {
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

const updateTask = createAppAsyncThunk<{ todolistID: string, taskID: string, task: TaskType },
	{ todolistID: string, taskID: string, changeableData: updateDomainTaskModelType }>('task/updateTask',
	async ({todolistID, taskID, changeableData}, thunkAPI) => {
		const {dispatch, rejectWithValue, getState} = thunkAPI
		dispatch(appActions.setAppStatus({status: 'loading'}))
		const state = getState()
		const task = state.tasks[todolistID].find(task => task.id === taskID)
		if (!task) {
			throw new Error('Task not found')
		}
		const modelAPI: UpdateTaskModelType = {
			title: task.title,
			description: task.description,
			status: task.status,
			priority: task.priority,
			startDate: task.startDate,
			deadline: task.deadline,
			...changeableData
		}
		try {
			const res = await todolistAPI.updateTask(todolistID, taskID, modelAPI)
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
				return {todolistID, taskID, task: res.data.data.item}
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
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getTasks.fulfilled, (state, action) => {
				state[action.payload.todolistID] = action.payload.tasks
			})
			.addCase(addTask.fulfilled, (state, action) => {
				state[action.payload.taskItem.todoListId].unshift(action.payload.taskItem)
			})
			.addCase(removeTask.fulfilled, (state, action) => {
				state[action.payload.todolistID] = state[action.payload.todolistID]
					.filter(task => task.id !== action.payload.taskID)
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				state[action.payload.todolistID] = state[action.payload.todolistID]
					.map(task => task.id === action.payload.taskID ? {...task, ...action.payload.task} : task)
			})
			.addCase(todolistsThunks.addNewTodolist.fulfilled, (state, action) => {
				state[action.payload.todolist.id] = []
			})
			.addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
				delete state[action.payload.todolistID]
			})
			.addCase(todolistsThunks.getTodolists.fulfilled, (state, action) => {
				action.payload.todolists.forEach(tl => state[tl.id] = [])
			})
			.addCase(todolistsActions.cleanerTodolists, () => {
				return {}
			})
	}
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = {getTasks, addTask, removeTask, updateTask}
