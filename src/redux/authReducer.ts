import {authAPI, AuthDataType, todolistAPI} from "../API/todolistAPI";
import {TypedDispatch} from "./store";
import {setAppStatusAC} from "./appReducer";


const initialAuthState = {
    isLoggedIn: false,
}
export type InitialAuthStateType = typeof initialAuthState


export const authReducer = (state = initialAuthState, action: AuthActionType): InitialAuthStateType => {
    switch (action.type) {
        case AUTH_ACTION_TYPE_NAME.SET_IS_LOGGED_IN: {
            return {...state, isLoggedIn: action.value}
        }
        default: {
            return state
        }
    }
}

export enum AUTH_ACTION_TYPE_NAME {
    SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN",
}
// ACTION-CREATOR ======================================================================================================
export const setIsLoggedInAC = (value: boolean): setIsLoggedInActionType => {
    return {type: AUTH_ACTION_TYPE_NAME.SET_IS_LOGGED_IN, value}
}

export type AuthActionType = setIsLoggedInActionType

type setIsLoggedInActionType = {
    type: AUTH_ACTION_TYPE_NAME
    value: boolean
}
// THUNK CREATORS ======================================================================================================
export const authLoginTC = (loginData: AuthDataType) => (dispatch: TypedDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.authLogin(loginData)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('failed'))
            }
        })
}