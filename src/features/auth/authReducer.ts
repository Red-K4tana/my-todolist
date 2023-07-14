import {handleServerAppError, handleServerNetworkError} from 'common/utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {appActions} from 'app/appReducer';
import {todolistsActions} from 'features/TodolistsList/Todolist/todolistsReducer';
import {authAPI, AuthRequestDataType} from './authApi';
import {ResultCode} from 'common/commonEmuns';
import {createAppAsyncThunk} from 'common/utils';


// THUNK CREATORS ======================================================================================================
const authLogIn = createAppAsyncThunk<{isLoggedIn: boolean}, AuthRequestDataType>(
	'auth/logIn',
	async (logInData, thunkAPI) => {
		const {dispatch, rejectWithValue} = thunkAPI
		try {
			dispatch(appActions.setAppStatus({status: 'loading'}))
			const res = await authAPI.authLogIn(logInData)
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
				return {isLoggedIn: true}
			} else {
				handleServerAppError(res.data, dispatch)
				return rejectWithValue(null)
			}
		}
		catch (err) {
			handleServerNetworkError(err, dispatch)
			return rejectWithValue(null)
		}
	})

const authLogOut = createAppAsyncThunk<{isLoggedIn: boolean}, void>(
	'auth/logOut',
	async (_, thunkAPI) => {
		const {dispatch, rejectWithValue} = thunkAPI
		try {
			dispatch(appActions.setAppStatus({status: 'loading'}))
			const res = await authAPI.authLogOut()
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(todolistsActions.cleanerTodolists())
				dispatch(appActions.setAppStatus({status: 'succeeded'}))
				return {isLoggedIn: false}
			} else {
				handleServerAppError(res.data, dispatch)
				return rejectWithValue(null)
			}
		} catch (err) {
			handleServerNetworkError(err, dispatch)
			return rejectWithValue(null)
		}
	})

const authMe = createAppAsyncThunk<{isLoggedIn: boolean}, void>(
	'auth/me',
		async (_, thunkAPI) => {
			const {dispatch, rejectWithValue} = thunkAPI
			try {
				dispatch(appActions.setAppStatus({status: 'loading'}))
				const res = await authAPI.authMe()
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(appActions.setAppStatus({status: 'succeeded'}))
					return {isLoggedIn: true}
				} else {
					handleServerAppError(res.data, dispatch)
					return rejectWithValue(null)
				}
			} catch (err) {
				handleServerNetworkError(err, dispatch)
				return rejectWithValue(null)
			} finally {
				dispatch(appActions.setAppInit({isInit: true}))
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
			.addCase(authLogIn.fulfilled, (state, action) => {
				state.isLoggedIn = action.payload.isLoggedIn
			})
			.addCase(authLogOut.fulfilled, (state, action) => {
				state.isLoggedIn = action.payload.isLoggedIn
			})
			.addCase(authMe.fulfilled, (state, action) => {
				state.isLoggedIn = action.payload.isLoggedIn
			})
	}
})
export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {authLogIn, authLogOut, authMe}

