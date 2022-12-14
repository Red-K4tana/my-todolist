import {authAPI, AuthDataType, todolistAPI} from "../API/todolistAPI";
import {TypedDispatch} from "./store";
import {setAppErrorAC, setAppInitAC, setAppStatusAC} from "./appReducer";
import {AxiosResponse} from "axios";


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
              dispatch(setAppStatusAC('succeeded'))
            }
        })
        .catch(error => {
          dispatch(setAppStatusAC('failed'))
          dispatch(setAppErrorAC(error.message))
        })
}
export const authMeTC = () => (dispatch: TypedDispatch) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.authMe()
      .then(res  => {
          if (res.data.resultCode === 0) {
            console.log('resultCode - ', res.data.resultCode)
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
          } else {
            console.log('resultCode - ', res.data.resultCode)
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
          }
        }
      )
      .catch(error => {
        dispatch(setAppStatusAC('failed'))
        dispatch(setAppErrorAC(error.message))
      })
    .finally(()=>{
      dispatch(setAppInitAC(true))
    })
}