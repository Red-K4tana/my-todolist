import {handleServerAppError, handleServerNetworkError} from 'common/utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {appActions} from 'app/appReducer';
import {todolistsActions} from 'features/TodolistsList/Todolist/todolistsReducer';
import {authAPI, AuthRequestDataType} from './authApi';
import {ResultCode} from 'common/commonEmuns';
import {createAppAsyncThunk} from 'common/utils';


// THUNK CREATORS ======================================================================================================
const authLogIn = createAppAsyncThunk<{}, AuthRequestDataType>(
	'auth/logIn',
	async (logInData, thunkAPI) => {
		console.log('auth/logIn')
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

const authLogOut = createAppAsyncThunk<{}, {}>(
	'auth/logOut',
	async ({}, thunkAPI) => {
		console.log('auth/logOut')
		const {dispatch, rejectWithValue} = thunkAPI
		dispatch(appActions.setAppStatus({status: 'loading'}))
		dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
		dispatch(todolistsActions.cleanerTodolists())
		try {
			const res = await authAPI.authLogOut()
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
			} else {
				dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
				handleServerAppError(res.data, dispatch)
			}
		} catch (err) {
			handleServerNetworkError(err, dispatch)
			return rejectWithValue(null)
		}
	})

const authMe = createAppAsyncThunk<{}, {}>(
	'auth/me',
		async ({}, thunkAPI) => {
			console.log('auth/me')
			const {dispatch, rejectWithValue} = thunkAPI
			dispatch(appActions.setAppStatus({status: 'loading'}))
			try {
				const res = await authAPI.authMe()
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
					dispatch(appActions.setAppStatus({status: 'succeeded'}))

					dispatch(appActions.setAppInit({isInit: true}))
				} else {
					dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))

					dispatch(appActions.setAppInit({isInit: true}))
					handleServerAppError(res.data, dispatch)
				}
			} catch (err) {
				handleServerNetworkError(err, dispatch)
				dispatch(appActions.setAppInit({isInit: true}))
				return rejectWithValue(null)
			}
	})

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
	extraReducers: builder => {
		builder
			.addCase(authLogOut.fulfilled, (state, action) => {
				console.log('authLogOut')
			})
	}
})
export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {authLogIn, authLogOut, authMe}

