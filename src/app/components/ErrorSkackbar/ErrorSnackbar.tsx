import {useEffect} from 'react';
import sl from './ErrorSnackbar.module.css';
import {Button} from 'app/components/Button/Button';
import { useAppDispatch} from 'app/redux/store';
import {setAppErrorAC, setAppStatusAC} from 'app/redux/appReducer';

type ErrorPropsType = {
    error: string
}

export const ErrorSnackbar = (props: ErrorPropsType) => {
    const dispatch = useAppDispatch()
    let timeoutID: any;

    useEffect(()=>{
        timeoutID = setTimeout(()=>{
            dispatch(setAppErrorAC(null))
        }, 7000)
    },[])

    useEffect(()=>{
        dispatch(setAppStatusAC('failed'))
    },[])

    const closeErrorHandler = () => {
        clearTimeout(timeoutID)
        dispatch(setAppErrorAC(null))
    }

    return (
        <>{props.error &&
            <div className={`${sl.snackbar} ${sl.opacitySnackbar}`}>
                <div className={sl.snackbar__row}>
                    <span>
                        {props.error}
                    </span>
                    <Button name={'X'} callback={closeErrorHandler}
                            style={sl.closeErrorButton}
                            classNameSpanButton={sl.classNameSpanCloseError}
                    />
                </div>
            </div>
        }
        </>
    );
};