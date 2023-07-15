import {ResponseServerType} from 'common/types';
import {appActions} from 'app/appReducer';
import {TypedDispatch} from 'app/store';
import axios, {AxiosError} from 'axios';


/**
 * This function handles errors that return server and that can occur due to the fault of the user
 * @param data - server response to any request
 * @param dispatch - function for dispatch message to store Redux
 */
export const handleServerAppError = (data: ResponseServerType, dispatch: TypedDispatch) => {
	dispatch(appActions.setAppError(data.messages.length ? {error: data.messages[0]} : {error: 'Some error occurred'}))
	dispatch(appActions.setAppStatus({status: 'failed'}))
}

/**
 * This function handles network errors
 * @param e - AxiosError response or Native error when network failure
 * @param dispatch - function for dispatch message to store Redux
 */
export const handleServerNetworkError = (err: unknown, dispatch: TypedDispatch) => {
	const error = err as Error | AxiosError<{error: string}>
	if (axios.isAxiosError(error)) {
		dispatch(appActions.setAppError({error: error.message ? error.message : 'Some error occurred'}))
	} else {
		dispatch(appActions.setAppError({error: `Native error ${error.message}`}))
	}

	dispatch(appActions.setAppStatus({status: 'failed'}))
}
