import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {appActions} from 'app/appReducer';
import {todolistsActions} from 'features/TodolistsList/Todolist/todolistsReducer';
import {authAPI, AuthRequestData} from './authApi';
import {ResultCode} from 'common/commonEmuns';
import {createAppAsyncThunk, thunkTryCatch} from 'common/utils';


// THUNK CREATORS ======================================================================================================
const authLogIn = createAppAsyncThunk<{isLoggedIn: boolean}, AuthRequestData>(
	'auth/logIn',
	async (logInData, thunkAPI) => {
		const {dispatch, rejectWithValue} = thunkAPI

		const res = await authAPI.authLogIn(logInData)
		if (res.data.resultCode === ResultCode.Success) {
			return {isLoggedIn: true}
		} else {
			return rejectWithValue({data: res.data, showGlobalError: true})
		}
	})

const authLogOut = createAppAsyncThunk<{isLoggedIn: boolean}, void>(
	'auth/logOut',
	async (_, thunkAPI) => {
		const {dispatch, rejectWithValue} = thunkAPI

		const res = await authAPI.authLogOut()
		if (res.data.resultCode === ResultCode.Success) {
			dispatch(todolistsActions.cleanerTodolists())
			return {isLoggedIn: false}
		} else {
			return rejectWithValue({data: res.data, showGlobalError: true})
		}
	})


const authMe = createAppAsyncThunk<{isLoggedIn: boolean}, void>(
	'auth/me',
		async (_, thunkAPI) => {
			const {dispatch, rejectWithValue} = thunkAPI

			const res = await authAPI.authMe()
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(appActions.setAppInit({isInit: true}))
				return {isLoggedIn: true}
			} else {
				dispatch(appActions.setAppInit({isInit: true}))
				return rejectWithValue({data: res.data, showGlobalError: true})
			}
	})

const initialState = {
	isLoggedIn: false,
}

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

