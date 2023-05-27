import {useEffect} from 'react';
import sl from './ErrorSnackbar.module.css';
import {Button} from 'components/Button/Button';
import { useAppDispatch} from 'app/store';
import {appActions} from 'app/appReducer';

type ErrorPropsType = {
    error: string
}

export const ErrorSnackbar = (props: ErrorPropsType) => {
    const dispatch = useAppDispatch()
    let timeoutID: any;

    useEffect(()=>{
        timeoutID = setTimeout(()=>{
            dispatch(appActions.setAppError({error: null}))
        }, 7000)
    },[])

    useEffect(()=>{
        dispatch(appActions.setAppError({error: 'failed'}))
    },[])

    const closeErrorHandler = () => {
        clearTimeout(timeoutID)
        dispatch(appActions.setAppError({error: null}))
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