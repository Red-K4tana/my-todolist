import React, {useEffect, useState} from 'react';
import sl from './ErrorSnackbar.module.css';
import {Button} from "../Button/Button";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../redux/store";
import {setAppErrorAC, setAppStatusAC} from "../../redux/appReducer";

type ErrorPropsType = {
    error: string
}

export const ErrorSnackbar = (props: ErrorPropsType) => {
    const dispatch = useAppDispatch()
    const [closedError, setClosedError] = useState<boolean>(false)

    console.log('ErrorSnackbar ', props.error)

    useEffect(()=>{
        dispatch(setAppStatusAC('failed'))
    },[])

    const closeErrorHandler = () => {
        dispatch(setAppErrorAC(null))
        setClosedError(true)
    }

    return (
        <>{props.error && <div className={`${sl.snackbar} ${sl.slideSnackbar} ${closedError && sl.closedSnackbar} `}>
                <div className={sl.snackbar__row}>
                    {props.error}
                </div>
            <Button name={'X'} callback={closeErrorHandler} style={sl.closeErrorButton}/>
            </div>
        }

        </>

    );
};
