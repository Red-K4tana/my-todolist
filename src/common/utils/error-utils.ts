import {ResponseServerType} from 'common/types';
import {appActions} from 'app/appReducer';
import {TypedDispatch} from 'app/store';
import axios, {AxiosError} from 'axios';




// обработка ошибок приложения, если пользователь что-то не так делает и тех, которые не попадают в catch
export const handleServerAppError = (data: ResponseServerType, dispatch: TypedDispatch) => {
	dispatch(appActions.setAppError(data.messages.length ? {error: data.messages[0]} : {error: 'Some error occurred'}))
	dispatch(appActions.setAppStatus({status: 'failed'}))
}

// обработка ошибок сети, сервера и тех, которые ловятся в catch
export const handleServerNetworkError = (e: unknown, dispatch: TypedDispatch) => {
	const error = e as Error | AxiosError<{error: string}>
	if (axios.isAxiosError(error)) {
		dispatch(appActions.setAppError({error: error.message ? error.message : 'Some error occurred'}))
	} else {
		dispatch(appActions.setAppError({error: `Native error ${error.message}`}))
	}

	dispatch(appActions.setAppStatus({status: 'failed'}))
}
