import {BaseThunkAPI} from '@reduxjs/toolkit/dist/createAsyncThunk';
import {AppRootStateType, TypedDispatch} from 'app/store';
import {handleServerNetworkError} from 'common/utils/error-utils';
import {appActions} from 'app/appReducer';
import {ResponseServerType} from 'common/types';

export const thunkTryCatch = async (
	thunkAPI: BaseThunkAPI<AppRootStateType, any, TypedDispatch, null | ResponseServerType>,
	logic: Function
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
	}
}