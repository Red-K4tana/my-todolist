import {TypedDispatch} from 'app/redux/store';
import {ResponseType} from 'API/todolistAPI';
import {appActions} from 'app/redux/appReducer';

// обработка ошибок приложения, если пользователь что-то не так делает и тех, которые не попадают в catch
export const handleServerAppError = (data: ResponseType, dispatch: TypedDispatch) => {
	if (data.messages.length) {
		dispatch(appActions.setAppError({error: data.messages[0]}))
	} else {
		dispatch(appActions.setAppError({error: 'Some error occurred'}))
	}
	dispatch(appActions.setAppStatus({status: 'failed'}))
}

// обработка ошибок сети, сервера и тех, которые ловятся в catch
export const handleServerNetworkError = (errorMessage: string, dispatch: TypedDispatch) => {
	const textError = () => {
		if (errorMessage) {
			if (errorMessage === 'Authorization has been denied for this request.') {
				return 'Authorization please!'
			} else {
				return errorMessage
			}
		} else {
			return 'Some error occurred'
		}
	}
	dispatch(appActions.setAppError({error: textError()}))
	dispatch(appActions.setAppStatus({status: 'failed'}))
}
