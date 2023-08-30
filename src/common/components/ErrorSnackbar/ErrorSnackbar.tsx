import {FC, useEffect} from 'react';
import sl from 'common/components/ErrorSnackbar/ErrorSnackbar.module.css';
import {Button} from 'common/components';
import {appActions} from 'app/appReducer';
import {useAppDispatch} from 'common/hooks';

type ErrorProps = {
    error: string
}

export const ErrorSnackbar: FC<ErrorProps> = ({ error }) => {
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
        <>{error &&
            <div className={`${sl.snackbar} ${sl.opacitySnackbar}`}>
                <div className={sl.snackbar__row}>
                    <span>
                        {error}
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