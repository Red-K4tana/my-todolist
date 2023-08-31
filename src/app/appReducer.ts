import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
				console.log('addMatcher - 1')
				return action.type.endsWith('/pending')
			},
				(state, action) => {
					console.log('addMatcher - 2')
					state.status = 'loading'
				})
			.addMatcher((action) => {
					console.log('addMatcher - 1')
					return action.type.endsWith('/fulfilled')
				},
				(state, action) => {
					console.log('addMatcher - 2')
					state.status = 'idle'
				})
	}
})

export const appReducer = slice.reducer
export const appActions = slice.actions
