import {TypedDispatch} from "./app/redux/store";
import {setAppErrorAC, setAppStatusAC} from "./app/redux/appReducer";
import {ResponseType} from "./API/todolistAPI";

// обработка ошибок приложения, если пользователь что-то не так делает и тех, которые не попадают в catch
export const handleServerAppError = (data: ResponseType, dispatch: TypedDispatch) => {
	if (data.messages.length) {
		dispatch(setAppErrorAC(data.messages[0]))
	} else {
		dispatch(setAppErrorAC('Some error occurred'))
	}
	dispatch(setAppStatusAC('failed'))
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
	dispatch(setAppErrorAC(textError()))
	dispatch(setAppStatusAC('failed'))
}
