import {handleServerAppError, handleServerNetworkError} from 'common/utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {appActions} from 'app/appReducer';
import {todolistsActions} from 'features/TodolistsList/Todolist/todolistsReducer';
import {TypedDispatch} from 'app/store';
import {authAPI, AuthRequestDataType} from './authApi';
import {ResultCode} from 'common/commonEmuns';
import {createAppAsyncThunk} from 'common/utils';


// THUNK CREATORS ======================================================================================================
const authLogIn = createAppAsyncThunk<{}, AuthRequestDataType>(
	'auth/logIn',
	async (logInData, thunkAPI) => {
		const {dispatch, rejectWithValue} = thunkAPI
		dispatch(appActions.setAppStatus({status: 'loading'}))
		try {
			const res = await authAPI.authLogIn(logInData)
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
			} else {
				dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
				handleServerAppError(res.data, dispatch)
			}
		}
		catch (err) {
			handleServerNetworkError(err, dispatch)
			return rejectWithValue(null)
		}
	})
/*export const authLogIn = (loginData: AuthRequestDataType) => (dispatch: TypedDispatch) => {
	dispatch(appActions.setAppStatus({status: 'loading'}))
	authAPI.authLogIn(loginData)
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
}*/
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
	authAPI.authLogOut()
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

