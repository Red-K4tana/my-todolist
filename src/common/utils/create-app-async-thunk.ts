import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppRootStateType, TypedDispatch} from 'app/store';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppRootStateType
	dispatch: TypedDispatch
	rejectValue: unknown
}>()