import {useDispatch} from 'react-redux';
import {TypedDispatch} from 'app/store';


export const useAppDispatch = () => useDispatch<TypedDispatch>()