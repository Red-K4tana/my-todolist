import {useDispatch} from 'react-redux';
import {TypedDispatch} from 'app/store';


/**
 * useAppDispatch is created to return a dispatch with a specific type for thunks and action creators
 */
export const useAppDispatch = () => useDispatch<TypedDispatch>()