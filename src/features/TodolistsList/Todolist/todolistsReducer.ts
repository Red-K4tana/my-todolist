import {handleServerAppError} from 'common/utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RespTodolist, todolistAPI} from 'features/TodolistsList/todolistApi';
import {ResultCode} from 'common/commonEmuns';
import {createAppAsyncThunk, thunkTryCatch} from 'common/utils';



// THUNK CREATORS ======================================================================================================
const getTodolists = createAppAsyncThunk<{ todolists: RespTodolist[] }, void>(
	'todolists/getTodolists',
	(_, thunkAPI) => {
		return thunkTryCatch(thunkAPI, async () => {
			const res = await todolistAPI.getTodolists()
			return {todolists: res.data}
		})
	})
const addNewTodolist = createAppAsyncThunk<{ todolist: RespTodolist }, string>(
	'todolists/addTodolist',
	(title, thunkAPI) => {
			const {dispatch, rejectWithValue} = thunkAPI
			return thunkTryCatch(thunkAPI, async () => {
				const res = await todolistAPI.createTodolist(title)
				if (res.data.resultCode === ResultCode.Success) {
					return {todolist: res.data.data.item}
				} else {
					handleServerAppError(res.data, dispatch)
					return rejectWithValue(null)
				}
			})
		}
	)
const removeTodolist = createAppAsyncThunk<{ todolistID: string }, string>(
	'todolists/removeTodolist',
		(todolistID, thunkAPI) => {
			const {dispatch, rejectWithValue} = thunkAPI
			return thunkTryCatch(thunkAPI, async () => {
				const res = await todolistAPI.removeTodolist(todolistID)
				if (res.data.resultCode === ResultCode.Success) {
					return { todolistID }
				} else {
					handleServerAppError(res.data, dispatch)
					return rejectWithValue(null)
				}
			})
		}
	)
const changeTodolistTitle = createAppAsyncThunk<
	{ todolistID: string, newTitle: string },
	{ todolistID: string, newTitle: string }
	>(
	'todolists/changeTodolistTitle',
	({todolistID, newTitle}, thunkAPI) => {
		const {dispatch, rejectWithValue} = thunkAPI
		return thunkTryCatch(thunkAPI, async () => {
			const res = await todolistAPI.updateTodolist(todolistID, newTitle)
			if (res.data.resultCode === ResultCode.Success) {
				return {todolistID, newTitle}
			} else {
				handleServerAppError(res.data, dispatch)
				return rejectWithValue(null)
			}
		})
	}
	)

export type TodolistFilterType = 'All' | 'Active' | 'Completed'
export type TodolistStateType = RespTodolist & { filter: TodolistFilterType }
const initialState: Array<TodolistStateType> = []

const slice = createSlice({
	name: 'todolist',
	initialState,
	reducers: {
		changeTodolistFilter: (state, action: PayloadAction<{todolistID: string, filter: TodolistFilterType}>) => {
			let tl = state.find(tl => tl.id === action.payload.todolistID)
			if (tl)
				tl.filter = action.payload.filter
		},
		cleanerTodolists: () => {
			return []
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getTodolists.fulfilled, (state, action) => {
				return action.payload.todolists.map((tl: RespTodolist) => ({...tl, filter: 'All'}))
			})
			.addCase(addNewTodolist.fulfilled, (state, action) => {
				state.unshift({...action.payload.todolist, filter: 'All'})
			})
			.addCase(removeTodolist.fulfilled, (state, action) => {
				return state.filter(tl => tl.id !== action.payload.todolistID)
			})
			.addCase(changeTodolistTitle.fulfilled, (state, action) => {
				const indexChangedTodolist = state.findIndex(tl => tl.id === action.payload.todolistID)
				state[indexChangedTodolist].title = action.payload.newTitle
			})
	}
})
export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = {addNewTodolist, removeTodolist, changeTodolistTitle, getTodolists}