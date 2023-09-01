import {createSlice, isAllOf, isPending, PayloadAction} from '@reduxjs/toolkit';
import {tasksThunks} from "features/TodolistsList/Task/tasksReducer";
import {todolistsThunks} from "features/TodolistsList/Todolist/todolistsReducer";

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
	isInit: false,
	status: 'idle' as RequestStatus,
	error: null as string | null,
}

const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setAppInit: (state, action: PayloadAction<{ isInit: boolean }>) => {
			state.isInit = action.payload.isInit
		},
		setAppStatus: (state, action: PayloadAction<{ status: RequestStatus }>) => {
			state.status = action.payload.status
		},
		setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
			state.error = action.payload.error
		},
	},
	extraReducers: builder => {
		builder
			.addMatcher((action) => {
				return action.type.endsWith('/pending')
			},
				// isPending, can be used further 'ifFulfilled', 'isRejected' et al.
				(state, action) => {
					state.status = 'loading'
				})
			.addMatcher((action) => {
					return action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')
				},
				(state, action) => {
					state.status = 'idle'
				})
	}
})

export const appReducer = slice.reducer
export const appActions = slice.actions
