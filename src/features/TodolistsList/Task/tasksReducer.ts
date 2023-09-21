import {appActions} from 'app/appReducer';
import {createSlice} from '@reduxjs/toolkit';
import {todolistsActions, todolistsThunks} from 'features/TodolistsList/Todolist/todolistsReducer';
import {createAppAsyncThunk} from 'common/utils';
import {TaskItem, todolistAPI, UpdateTaskModel} from 'features/TodolistsList/todolistApi';
import {ResultCode, TaskPriorities, TaskStatuses} from 'common/commonEmuns';
import {clearTasksAndTodolists} from "../../../common/actions/commonActions";


// THUNK CREATORS ======================================================================================================
export type updateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}

const getTasks = createAppAsyncThunk<{ todolistID: string, tasks: TaskItem[] }, string>
('tasks/getTasks',
	async (todolistID, thunkAPI) => {
		const res = await todolistAPI.getTasks(todolistID)
		//without app error handing
		return {todolistID, tasks: res.data.items}
	})

const addNewTask = createAppAsyncThunk<{ taskItem: TaskItem }, { todolistID: string, title: string }>
('tasks/addTask',
	 async ({todolistID, title}, thunkAPI) => {
		const {rejectWithValue} = thunkAPI
		 const res = await todolistAPI.createTask(todolistID, title)
		 if (res.data.resultCode === ResultCode.Success) {
			 return {taskItem: res.data.data.item}
		 } else {
			 return rejectWithValue({data: res.data, showGlobalError: true})
		 }
	})
const removeTask = createAppAsyncThunk<{ todolistID: string, taskID: string },
	{ todolistID: string, taskID: string }>('tasks/removeTask',
	async ({todolistID, taskID}, thunkAPI) => {
		const {rejectWithValue} = thunkAPI
		const res = await todolistAPI.removeTask(todolistID, taskID)
		if (res.data.resultCode === ResultCode.Success) {
			return {todolistID, taskID}
		} else {
			return rejectWithValue({data: res.data, showGlobalError: true})
		}
	})

const updateTask = createAppAsyncThunk<{ todolistID: string, taskID: string, task: TaskItem },
	{ todolistID: string, taskID: string, changeableData: updateDomainTaskModelType }>('task/updateTask',
	async ({todolistID, taskID, changeableData}, thunkAPI) => {
		const {rejectWithValue, getState} = thunkAPI
		const state = getState()
		const task = state.tasks[todolistID].find(task => task.id === taskID)
		if (!task) {
			throw new Error('Task not found')
		}
		const modelAPI: UpdateTaskModel = {
			title: task.title,
			description: task.description,
			status: task.status,
			priority: task.priority,
			startDate: task.startDate,
			deadline: task.deadline,
			...changeableData
		}
		const res = await todolistAPI.updateTask(todolistID, taskID, modelAPI)
		if (res.data.resultCode === ResultCode.Success) {
			return {todolistID, taskID, task: res.data.data.item}
		} else {
			return rejectWithValue({data: res.data, showGlobalError: false})
		}
	})

export type TasksStateType = {
	[todolist_id: string]: Array<TaskItem>
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
			.addCase(addNewTask.fulfilled, (state, action) => {
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
			/*.addCase(clearTasksAndTodolists, () => {
				return {}
			})*/
	}
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = {getTasks, addNewTask, removeTask, updateTask}
