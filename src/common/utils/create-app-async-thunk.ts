import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppRootStateType, TypedDispatch} from 'app/store';
import {ResponseServerType} from 'common/types';

/**
 * createAppAsyncThunk defines the types of entity to use so as not to write then every time
 */

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppRootStateType
	dispatch: TypedDispatch
	rejectValue: null | ResponseServerType
}>()