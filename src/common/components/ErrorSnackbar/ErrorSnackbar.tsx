import {useEffect} from 'react';
import sl from 'common/components/ErrorSnackbar/ErrorSnackbar.module.css';
import {Button} from 'common/components';
import {appActions} from 'app/appReducer';
import {useAppDispatch} from 'common/hooks';

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