import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AppStateType = typeof initialState

const initialState = {
	isInit: false,
	status: 'idle' as RequestStatusType,
	error: null as string | null,
}

const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setAppInit: (state, action: PayloadAction<{ isInit: boolean }>) => {
			state.isInit = action.payload.isInit
		},
		setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
			state.status = action.payload.status
		},
		setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
			state.error = action.payload.error
		},
	},
})

export const appReducer = slice.reducer
export const appActions = slice.actions

/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/
/*export const appReducer = (appState = initialState, action: AppStateActionType): AppStateType => {
    switch (action.type) {
        case APP_ACTION_TYPE_NAME.SET_INIT: {
            return {...appState, isInit: action.isInit}
        }
        case APP_ACTION_TYPE_NAME.SET_STATUS: {
            return {...appState, status: action.status}
        }
        case APP_ACTION_TYPE_NAME.SET_ERROR: {
            return {...appState, error: action.error}
        }
        default: {
            return appState
        }
    }
}
export enum APP_ACTION_TYPE_NAME {
    SET_INIT = "SET_INIT",
    SET_STATUS = "SET_STATUS",
    SET_ERROR = "SET_ERROR",
}
// ACTION-CREATOR ======================================================================================================
export const setAppInitAC = (isInit: boolean): setAppInitActionType => {
    return {type: APP_ACTION_TYPE_NAME.SET_INIT, isInit} as const
}
export const setAppStatusAC = (status: RequestStatusType): setAppStatusActionType => {
    return {type: APP_ACTION_TYPE_NAME.SET_STATUS, status} as const
}
export const setAppErrorAC = (error: string | null): setAppErrorActionType => {
    return {type: APP_ACTION_TYPE_NAME.SET_ERROR, error} as const
}
export type AppStateActionType = setAppInitActionType | setAppStatusActionType | setAppErrorActionType
type setAppInitActionType = {
    type: APP_ACTION_TYPE_NAME.SET_INIT
    isInit: boolean
}
type setAppStatusActionType = {
    type: APP_ACTION_TYPE_NAME.SET_STATUS
    status: RequestStatusType
}
type setAppErrorActionType = {
    type: APP_ACTION_TYPE_NAME.SET_ERROR
    error: string | null
}*/
/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/