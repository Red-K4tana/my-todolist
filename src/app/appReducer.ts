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
				return action.type.endsWith('/pending')
			},
				(state, action) => {
					state.status = 'loading'
				})
			.addMatcher((action) => {
					return action.type.endsWith('/fulfilled')
				},
				(state, action) => {
					state.status = 'idle'
				})
			.addMatcher(
				action => action.type.endsWith('/rejected'),
				(state, action) => {
					const {payload, error} = action
					if (action) {
						if (!payload) {
							state.error = error.message ? error.message : 'Some error occurred'
						} else if (payload.showGlobalError && payload.data.messages[0] !== 'You are not authorized') {
							state.error = payload.data.messages.length ? payload.data.messages[0] : 'Some error occurred'
						}
					} else {
						state.error = error.message ? error.message : 'Some error occurred'
					}
					state.status = 'failed'
				}
				)
	}
})

export const appReducer = slice.reducer
export const appActions = slice.actions
