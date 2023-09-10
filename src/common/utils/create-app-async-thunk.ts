import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppRootState, TypedDispatch} from 'app/store';
import {ResponseServer} from 'common/types';

/**
 * createAppAsyncThunk defines the types of entity to use so as not to write then every time
 */

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppRootState
	dispatch: TypedDispatch
	rejectValue: null | RejectValueType
}>()

export type RejectValueType = {
	data: ResponseServer
	showGlobalError: boolean
}