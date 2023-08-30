import {ActionCreator, ActionCreatorsMapObject, bindActionCreators} from 'redux';
import {useAppDispatch} from 'common/hooks/useAppDispatch';
import {useMemo} from 'react';
import {AsyncThunk} from '@reduxjs/toolkit';

/**
 * The useActions hook exports bound actions that can be used in the application.
 * It takes an object of actions and returns the bound actions (BoundActions<Actions>).
 * Inside the function, it uses the useAppDispatch hook to get the dispatch function from Redux.
 * Then, using the useMemo hook and the bindActionCreators function, the passed actions are bound to the dispatch function.
 * The bound actions are returned for use in application components.
 */

export const useActions = <Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject>
(actions: Actions): BoundActions<Actions> => {
	const dispatch = useAppDispatch();

	return useMemo(() => bindActionCreators(actions, dispatch), []);
};

// Types
type BoundActions<Actions extends ActionCreatorsMapObject> = {
	[key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
		? BoundAsyncThunk<Actions[key]>
		: Actions[key];
};

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
	...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>;