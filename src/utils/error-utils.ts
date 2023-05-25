import {ResponseType} from 'api/todolistAPI';
import {appActions} from 'app/appReducer';
import {Dispatch} from 'redux';




// обработка ошибок приложения, если пользователь что-то не так делает и тех, которые не попадают в catch
export const handleServerAppError = (data: ResponseType, dispatch: Dispatch) => {
	if (data.messages.length) {
		dispatch(appActions.setAppError({error: data.messages[0]}))
	} else {
		dispatch(appActions.setAppError({error: 'Some error occurred'}))
	}
	dispatch(appActions.setAppStatus({status: 'failed'}))
}

// обработка ошибок сети, сервера и тех, которые ловятся в catch
export const handleServerNetworkError = (errorMessage: string, dispatch: Dispatch) => {
	//const dispatch = useAppDispatch()
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
