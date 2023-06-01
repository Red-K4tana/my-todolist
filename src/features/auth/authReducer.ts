import {authAPI, AuthDataType, ResultCode} from 'api/todolistAPI';
import {handleServerAppError, handleServerNetworkError} from 'common/utils/error-utils';
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

// THUNK CREATORS ======================================================================================================
export const authLoginTC = (loginData: AuthDataType) => (dispatch: TypedDispatch) => {
	dispatch(appActions.setAppStatus({status: 'loading'}))
	authAPI.authLogin(loginData)
		.then(res => {
			if (res.data.resultCode === ResultCode.Success) {
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
			if (res.data.resultCode === ResultCode.Success) {
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
			if (res.data.resultCode === ResultCode.Success) {
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