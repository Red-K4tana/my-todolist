import {handleServerAppError, handleServerNetworkError} from 'common/utils/error-utils';
import {appActions} from 'app/appReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TypedDispatch} from 'app/store';
import {tasksThunks} from 'features/TodolistsList/Task/tasksReducer';
import {RespTodolistType, todolistAPI} from 'features/TodolistsList/todolistApi';
import {ResultCode} from 'common/commonEmuns';
import {createAppAsyncThunk} from 'common/utils';



// THUNK CREATORS ======================================================================================================
// GENERATES BUG==!!==!!==GENERATES BUG==!!==!!==GENERATES BUG==!!==!!==GENERATES BUG==!!==!!==GENERATES BUG==!!==!!==
/*const getTodolists = createAppAsyncThunk<{ todolists: RespTodolistType[] }, void>('todolists/getTodolists',
	async (_, thunkAPI) => {
		const {dispatch, rejectWithValue} = thunkAPI
		dispatch(appActions.setAppStatus({status: 'loading'}))
		try {
			const res = await todolistAPI.getTodolists()
			dispatch(appActions.setAppStatus({status: 'succeeded'}))
			return {todolists: res.data}
		} catch (err) {
			handleServerNetworkError(err, dispatch)
			return rejectWithValue(null)
		}
	})*/
// GENERATES BUG==!!==!!==GENERATES BUG==!!==!!==GENERATES BUG==!!==!!==GENERATES BUG==!!==!!==GENERATES BUG==!!==!!==
export const getTodolistsTC = () => (dispatch: TypedDispatch) => {
	dispatch(appActions.setAppStatus({status: 'loading'}))
	todolistAPI.getTodolists()
		.then(res => {
			dispatch(todolistsActions.setTodolists({todolists: res.data}))
			dispatch(appActions.setAppStatus({status: 'succeeded'}))
			return res.data
		})
		.then(todolists => {
			todolists.forEach(tl => dispatch(tasksThunks.getTasks(tl.id)))
		})
		.catch(error => {
			handleServerNetworkError(error.response.data.message, dispatch)
		})
}


// WORKED==!!==!!==WORKED==!!==!!==WORKED==WORKED==!!==!!==WORKED==!!==!!==WORKED==!!==!!==WORKED==!!==!!==WORKED
const addNewTodolist = createAppAsyncThunk<{ todolist: RespTodolistType }, string>('todolists/addTodolist',
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
/*export const addTodolistTC = (title: string) => (dispatch: TypedDispatch) => {
	dispatch(appActions.setAppStatus({status: 'loading'}))
	todolistAPI.createTodolist(title)
		.then(res => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(todolistsActions.addTodolist({todolist: res.data.data.item}))
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch(error => {
			handleServerNetworkError(error.message, dispatch)
		})
}*/
// WORKED==!!==!!==WORKED==!!==!!==WORKED==WORKED==!!==!!==WORKED==!!==!!==WORKED==!!==!!==WORKED==!!==!!==WORKED

// WORKED==!!==!!==WORKED==!!==!!==WORKED==WORKED==!!==!!==WORKED==!!==!!==WORKED==!!==!!==WORKED==!!==!!==WORKED
const removeTodolist = createAppAsyncThunk<{ todolistID: string }, string>('todolists/removeTodolist',
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
/*export const removeTodolistTC = (todolistID: string) => (dispatch: TypedDispatch) => {
	dispatch(appActions.setAppStatus({status: 'loading'}))
	todolistAPI.removeTodolist(todolistID)
		.then(res => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(todolistsActions.removeTodolist({todolistID}))
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch(error => {
			handleServerNetworkError(error.message, dispatch)
		})
}*/
// WORKED==!!==!!==WORKED==!!==!!==WORKED==WORKED==!!==!!==WORKED==!!==!!==WORKED==!!==!!==WORKED==!!==!!==WORKED

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
/*export const changeTodolistTitleTC = (todolistID: string, title: string) => (dispatch: TypedDispatch) => {
	dispatch(appActions.setAppStatus({status: 'loading'}))
	todolistAPI.updateTodolist(todolistID, title)
		.then(res => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(todolistsActions.changeTodolistTitle({todolistID, newTitle: title}))
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch(error => {
			handleServerNetworkError(error.message, dispatch)
		})
}*/



export type TodolistFilterType = 'All' | 'Active' | 'Completed'
export type TodolistStateType = RespTodolistType & { filter: TodolistFilterType }
const initialState: Array<TodolistStateType> = []

const slice = createSlice({
	name: 'todolist',
	initialState,
	reducers: {
		setTodolists: (state, action: PayloadAction<{todolists: RespTodolistType[]}>) => {
			return action.payload.todolists.map((tl: RespTodolistType) => ({...tl, filter: 'All'}))
		},
		/*addTodolist: (state, action: PayloadAction<{todolist: RespTodolistType}>) => {
			state.unshift({...action.payload.todolist, filter: 'All'})
		},*/
		/*removeTodolist: (state, action: PayloadAction<{todolistID: string}>) => {
			return state.filter(tl => tl.id !== action.payload.todolistID)
		},*/
		/*changeTodolistTitle: (state, action: PayloadAction<{todolistID: string, newTitle: string}>) => {
			let tl = state.find(tl => tl.id === action.payload.todolistID)
			if (tl)
				tl.title = action.payload.newTitle
		},*/
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
			/*.addCase(getTodolists.fulfilled, (state, action) => {
				return action.payload.todolists.map((tl: RespTodolistType) => ({...tl, filter: 'All'}))
			})*/
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
export const todolistsThunks = {addNewTodolist, removeTodolist, changeTodolistTitle}