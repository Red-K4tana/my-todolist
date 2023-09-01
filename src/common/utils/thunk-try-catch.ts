import {BaseThunkAPI} from '@reduxjs/toolkit/dist/createAsyncThunk';
import {AppRootState, TypedDispatch} from 'app/store';
import {handleServerNetworkError} from 'common/utils/error-utils';
import {appActions} from 'app/appReducer';
import {ResponseServer} from 'common/types';


/**
 * This function allows to take out the "try ... catch" and not to write every time when create thunk
 * @param thunkAPI - entity set for working thunk from Redux Toolkit
 * @param logic - function that executes side effects
 * @param additionalLogic - additional logic for finally
 */

export const thunkTryCatch = async (
	thunkAPI: BaseThunkAPI<AppRootState, any, TypedDispatch, null | ResponseServer>,
	logic: Function,
	additionalLogic: Function | undefined = undefined
) => {
	const {dispatch, rejectWithValue} = thunkAPI
	try {
		return await logic()
	} catch (err) {
		handleServerNetworkError(err, dispatch)
		return rejectWithValue(null)
	} finally {
		additionalLogic && additionalLogic()
	}
}