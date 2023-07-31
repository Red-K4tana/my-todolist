import {BaseThunkAPI} from '@reduxjs/toolkit/dist/createAsyncThunk';
import {AppRootStateType, TypedDispatch} from 'app/store';
import {handleServerNetworkError} from 'common/utils/error-utils';
import {appActions} from 'app/appReducer';
import {ResponseServerType} from 'common/types';


/**
 * This function allows to take out the "try ... catch" and not to write every time when create thunk
 * @param thunkAPI - entity set for working thunk from Redux Toolkit
 * @param logic - function that executes side effects
 * @param additionalLogic - additional logic for finally
 */

export const thunkTryCatch = async (
	thunkAPI: BaseThunkAPI<AppRootStateType, any, TypedDispatch, null | ResponseServerType>,
	logic: Function,
	additionalLogic: Function | undefined = undefined
) => {
	const {dispatch, rejectWithValue} = thunkAPI
	dispatch(appActions.setAppStatus({status: 'loading'}))
	try {
		return await logic()
	} catch (err) {
		handleServerNetworkError(err, dispatch)
		return rejectWithValue(null)
	} finally {
		dispatch(appActions.setAppStatus({status: 'idle'}))
		if (additionalLogic) {
			additionalLogic()
		}
	}
}