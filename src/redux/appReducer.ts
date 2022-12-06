
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type AppStateType = {
    isInit: boolean
    status: RequestStatusType
    error: string | null
}

const initialState: AppStateType = {
    isInit: true,
    status: "idle",
    error: null,
}

export const appReducer = (appState = initialState, action: AppStateActionType): AppStateType => {
    switch (action.type) {
        case APP_ACTION_TYPE_NAME.SET_INIT: {
            return appState
        }
        case APP_ACTION_TYPE_NAME.SET_STATUS: {
            return appState
        }
        case APP_ACTION_TYPE_NAME.SET_ERROR: {
            return appState
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
}