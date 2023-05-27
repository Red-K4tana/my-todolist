import {authAPI, AuthDataType} from 'api/todolistAPI';
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {appActions} from 'app/appReducer';
import {todolistsActions} from 'features/TodolistsList/Todolist/todolistsReducer';
import {TypedDispatch} from 'app/store';


const initialState = {
	isLoggedIn: false,
}
export type InitialAuthStateType = typeof initialState



const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
			state.isLoggedIn = action.payload.isLoggedIn
		},
	},
})
export const authReducer = slice.reducer
export const authActions = slice.actions
/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/
/*export const authReducer = (state = initialState, action: AuthActionType): InitialAuthStateType => {
	switch (action.type) {
		case AUTH_ACTION_TYPE_NAME.SET_IS_LOGGED_IN: {
			return {...state, isLoggedIn: action.value}
		}
		default: {
			return state
		}
	}
}
export enum AUTH_ACTION_TYPE_NAME {
	SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN',
}
// ACTION-CREATOR ======================================================================================================
export const setIsLoggedInAC = (value: boolean): setIsLoggedInActionType => {
	return {type: AUTH_ACTION_TYPE_NAME.SET_IS_LOGGED_IN, value}
}
export type AuthActionType = setIsLoggedInActionType
type setIsLoggedInActionType = {
	type: AUTH_ACTION_TYPE_NAME
	value: boolean
}*/
/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/

// THUNK CREATORS ======================================================================================================
export const authLoginTC = (loginData: AuthDataType) => (dispatch: TypedDispatch) => {
	dispatch(appActions.setAppStatus({status: 'loading'}))
	authAPI.authLogin(loginData)
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
			} else {
				dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch(error => {
			handleServerNetworkError(error.message, dispatch)
		})
}
export const authMeTC = () => (dispatch: TypedDispatch) => {
	dispatch(appActions.setAppStatus({status: 'loading'}))
	authAPI.authMe()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
			} else {
				dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
			}
		})
		.catch(error => {
			handleServerNetworkError(error.message, dispatch)
		})
		.finally(() => {
			dispatch(appActions.setAppInit({isInit: true}))
		})
}
export const authLogoutTC = () => (dispatch: TypedDispatch) => {
	dispatch(appActions.setAppStatus({status: 'loading'}))
	dispatch(todolistsActions.cleanerTodolists())
	authAPI.authLogout()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
			} else {
				dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
			}
		})
		.catch(error => {
			handleServerNetworkError(error.message, dispatch)
		})
}