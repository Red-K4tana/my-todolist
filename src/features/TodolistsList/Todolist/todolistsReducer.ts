import {handleServerAppError, handleServerNetworkError} from 'common/utils/error-utils';
import {appActions} from 'app/appReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TypedDispatch} from 'app/store';
import {tasksThunks} from 'features/TodolistsList/Task/tasksReducer';
import {RespTodolistType, todolistAPI} from 'features/TodolistsList/todolistApi';
import {ResultCode} from 'common/commonEmuns';
import {createAppAsyncThunk} from 'common/utils';



// THUNK CREATORS ======================================================================================================
const getTodolists = createAppAsyncThunk('todolists/getTodolists',
	async () => {

	}
	)
export const getTodolistsTC = () => (dispatch: TypedDispatch) => {
	dispatch(appActions.setAppStatus({status: 'loading'}))
	todolistAPI.getTodolists()
		.then(res => {
			dispatch(todolistsActions.setTodolist({todolists: res.data}))
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
export const addTodolistTC = (title: string) => (dispatch: TypedDispatch) => {
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
}
export const changeTodolistTitleTC = (todolistID: string, title: string) => (dispatch: TypedDispatch) => {
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

}
export const removeTodolistTC = (todolistID: string) => (dispatch: TypedDispatch) => {
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
}

export type TodolistFilterType = 'All' | 'Active' | 'Completed'
export type TodolistStateType = RespTodolistType & { filter: TodolistFilterType }
const initialState: Array<TodolistStateType> = []

const slice = createSlice({
	name: 'todolist',
	initialState,
	reducers: {
		setTodolist: (state, action: PayloadAction<{todolists: RespTodolistType[]}>) => {
			return action.payload.todolists.map((tl: RespTodolistType) => ({...tl, filter: 'All'}))
		},
		addTodolist: (state, action: PayloadAction<{todolist: RespTodolistType}>) => {
			state.unshift({...action.payload.todolist, filter: 'All'})
		},
		removeTodolist: (state, action: PayloadAction<{todolistID: string}>) => {
			return state.filter(tl => tl.id !== action.payload.todolistID)
		},
		changeTodolistTitle: (state, action: PayloadAction<{todolistID: string, newTitle: string}>) => {
			let tl = state.find(tl => tl.id === action.payload.todolistID)
			if (tl)
				tl.title = action.payload.newTitle
		},
		changeTodolistFilter: (state, action: PayloadAction<{todolistID: string, filter: TodolistFilterType}>) => {
			let tl = state.find(tl => tl.id === action.payload.todolistID)
			if (tl)
				tl.filter = action.payload.filter
		},
		cleanerTodolists: (state) => {
			console.log('todolist clear')
			return []
		},
	},
})
export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions