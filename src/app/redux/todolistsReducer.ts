import {TypedDispatch} from './store';
import {todolistAPI, RespTodolistType} from 'API/todolistAPI';
import {getTasksTC} from './tasksReducer';
import {handleServerAppError, handleServerNetworkError} from 'app/common/error-untils';
import {appActions} from 'app/redux/appReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
		cleanerTodolists: () => {
			return []
		},
	},
})
export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/
/*// ACTION CREATORS =====================================================================================================
export enum TODOLISTS_ACTION_TYPE_NAME {
	SET_TODOLISTS = 'todolist/SET_TODOLIST',
	ADD_TODOLIST_ITEM = 'todolist/ADD_TODOLIST_ITEM',
	REMOVE_TODOLIST_ITEM = 'todolist/REMOVE_TODOLIST_ITEM',
	CHANGE_TODOLIST_TITLE = 'todolist/CHANGE_TODOLIST_TITLE',
	CHANGE_TODOLIST_FILTER = 'todolist/CHANGE_TODOLIST_FILTER',
}

export type SetTodolistActionType = {
	type: TODOLISTS_ACTION_TYPE_NAME.SET_TODOLISTS
	RespTodolists: RespTodolistType[]
}
export type AddTodolistActionType = {
	type: TODOLISTS_ACTION_TYPE_NAME.ADD_TODOLIST_ITEM
	todolist: RespTodolistType
}
export type RemoveTodolistActionType = {
	type: TODOLISTS_ACTION_TYPE_NAME.REMOVE_TODOLIST_ITEM
	todolistID: string
}
export type ChangeTodolistTitleActionType = {
	type: TODOLISTS_ACTION_TYPE_NAME.CHANGE_TODOLIST_TITLE
	todolistID: string
	newTitle: string
}
export type ChangeTodolistFilterActionType = {
	type: TODOLISTS_ACTION_TYPE_NAME.CHANGE_TODOLIST_FILTER
	todolistID: string
	newFilter: TodolistFilterType
}

export type TodolistsActionType =
SetTodolistActionType
	| AddTodolistActionType
	| RemoveTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType*/
/*
export const setTodolistAC = (RespTodolists: RespTodolistType[]): SetTodolistActionType => {
	return {type: TODOLISTS_ACTION_TYPE_NAME.SET_TODOLISTS, RespTodolists} as const
}
export const addTodolistAC = (todolist: RespTodolistType): AddTodolistActionType => {
	return {type: TODOLISTS_ACTION_TYPE_NAME.ADD_TODOLIST_ITEM, todolist} as const
}
export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
	return {type: TODOLISTS_ACTION_TYPE_NAME.REMOVE_TODOLIST_ITEM, todolistID} as const
}
export const changeTodolistTitleAC = (todolistID: string, newTitle: string): ChangeTodolistTitleActionType => {
	return {type: TODOLISTS_ACTION_TYPE_NAME.CHANGE_TODOLIST_TITLE, todolistID, newTitle} as const
}
export const changeTodolistFilterAC = (todolistID: string, newFilter: TodolistFilterType): ChangeTodolistFilterActionType => {
	return {type: TODOLISTS_ACTION_TYPE_NAME.CHANGE_TODOLIST_FILTER, todolistID, newFilter} as const
}*/
/*
// TODOLIST-REDUCER ===================================================================================================
export const todolistReducer = (todolists = initialState, action: TodolistsActionType): Array<TodolistStateType> => {
	switch (action.type) {
		case TODOLISTS_ACTION_TYPE_NAME.SET_TODOLISTS: {
			return action.RespTodolists.map(todolist => ({...todolist, filter: 'All'}))
		}
		case TODOLISTS_ACTION_TYPE_NAME.ADD_TODOLIST_ITEM: {
			return [{...action.todolist, filter: 'All'}, ...todolists]
		}
		case TODOLISTS_ACTION_TYPE_NAME.REMOVE_TODOLIST_ITEM: {
			return todolists.filter(tl => tl.id !== action.todolistID)
		}
		case TODOLISTS_ACTION_TYPE_NAME.CHANGE_TODOLIST_TITLE: {
			return todolists.map(tl => tl.id === action.todolistID ? {...tl, title: action.newTitle} : tl)
		}
		case TODOLISTS_ACTION_TYPE_NAME.CHANGE_TODOLIST_FILTER: {
			return todolists.map(tl => tl.id === action.todolistID ? {...tl, filter: action.newFilter} : tl)
		}
		default: {
			return todolists
		}
	}
}*/
/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/
// THUNK CREATORS ======================================================================================================
export const getTodolistsTC = () => (dispatch: TypedDispatch) => {
	dispatch(appActions.setAppStatus({status: 'loading'}))
	todolistAPI.getTodolists()
		.then(res => {
			dispatch(todolistsActions.setTodolist({todolists: res.data}))
			dispatch(appActions.setAppStatus({status: 'succeeded'}))
			return res.data
		})
		.then(todolists => {
			todolists.forEach(tl => dispatch(getTasksTC(tl.id)))
		})
		.catch(error => {
			handleServerNetworkError(error.response.data.message, dispatch)
		})
}
export const addTodolistTC = (title: string) => (dispatch: TypedDispatch) => {
	dispatch(appActions.setAppStatus({status: 'loading'}))
	todolistAPI.createTodolist(title)
		.then(res => {
			if (res.data.resultCode === 0) {
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
			if (res.data.resultCode === 0) {
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
			if (res.data.resultCode === 0) {
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
