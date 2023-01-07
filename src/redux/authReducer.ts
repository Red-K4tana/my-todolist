

const initialAuthState = {
    isLoggedIn: false,
}
export type InitialAuthStateType = typeof initialAuthState


export const authReducer = (state: InitialAuthStateType = initialAuthState, action: any) => {
    switch (action.type) {
        case: AUTH_ACTION_TYPE_NAME.SET_IS_LOGGED_IN {
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