import React from 'react';
import sl from './ErrorSnackbar.module.css';
import {Button} from "../Button/Button";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";

export const ErrorSnackbar = () => {
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)

    return (
        <>{error && <div className={`${sl.snackbar} ${sl.slideSnackbar}`}>
                <div className={sl.snackbar__row}>
                    Error text bla-bla-bla-bla-bla-bla-bla-bla!!!

                </div>
            </div>
        }

        </>

    );
};
