import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppRootStateType, TypedDispatch} from 'app/store';
import {ResponseServerType} from 'common/types';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppRootStateType
	dispatch: TypedDispatch
	rejectValue: null | ResponseServerType
}>()