import {handleServerAppError, handleServerNetworkError} from 'common/utils/error-utils';
import {appActions} from 'app/appReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RespTodolistType, todolistAPI} from 'features/TodolistsList/todolistApi';
import {ResultCode} from 'common/commonEmuns';
import {createAppAsyncThunk} from 'common/utils';



// THUNK CREATORS ======================================================================================================
const getTodolists = createAppAsyncThunk<{ todolists: RespTodolistType[] }, void>(
	'todolists/getTodolists',
	async (_, thunkAPI) => {
		const {dispatch, rejectWithValue} = thunkAPI
		try {
			dispatch(appActions.setAppStatus({status: 'loading'}))
			const res = await todolistAPI.getTodolists()
			dispatch(appActions.setAppStatus({status: 'succeeded'}))
			return {todolists: res.data}
		} catch (err) {
			handleServerNetworkError(err, dispatch)
			return rejectWithValue(null)
		}
	})
const addNewTodolist = createAppAsyncThunk<{ todolist: RespTodolistType }, string>(
	'todolists/addTodolist',
		async (title, thunkAPI) => {
			const {dispatch, rejectWithValue} = thunkAPI
			try {
				dispatch(appActions.setAppStatus({status: 'loading'}))
				const res = await todolistAPI.createTodolist(title)
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(appActions.setAppStatus({status: 'succeeded'}))
					return {todolist: res.data.data.item}
				} else {
					handleServerAppError(res.data, dispatch)
					return rejectWithValue(null)
				}
			} catch (err) {
				handleServerNetworkError(err, dispatch)
				return rejectWithValue(null)
			}

		}
	)
const removeTodolist = createAppAsyncThunk<{ todolistID: string }, string>(
	'todolists/removeTodolist',
		async (todolistID, thunkAPI) => {
			const {dispatch, rejectWithValue} = thunkAPI
			try {
				dispatch(appActions.setAppStatus({status: 'loading'}))
				const res = await todolistAPI.removeTodolist(todolistID)
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(appActions.setAppStatus({status: 'succeeded'}))
					return { todolistID }
				} else {
					handleServerAppError(res.data, dispatch)
					return rejectWithValue(null)
				}
			} catch (err) {
				handleServerNetworkError(err, dispatch)
				return rejectWithValue(null)
			}
		}
	)
const changeTodolistTitle = createAppAsyncThunk<{ todolistID: string, newTitle: string }, { todolistID: string, newTitle: string }>(
	'todolists/changeTodolistTitle',
	async ({todolistID, newTitle}, thunkAPI) => {
		const {dispatch, rejectWithValue} = thunkAPI
		try {
			dispatch(appActions.setAppStatus({status: 'loading'}))
			const res = await todolistAPI.updateTodolist(todolistID, newTitle)
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
				return {todolistID, newTitle}
			} else {
				handleServerAppError(res.data, dispatch)
				return rejectWithValue(null)
			}
		} catch (err) {
			handleServerNetworkError(err, dispatch)
			return rejectWithValue(null)
		}
	}
	)

export type TodolistFilterType = 'All' | 'Active' | 'Completed'
export type TodolistStateType = RespTodolistType & { filter: TodolistFilterType }
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
				return action.payload.todolists.map((tl: RespTodolistType) => ({...tl, filter: 'All'}))
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