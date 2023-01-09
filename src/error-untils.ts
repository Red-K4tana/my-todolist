import {TypedDispatch} from "./redux/store";
import {setAppErrorAC, setAppStatusAC} from "./redux/appReducer";


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