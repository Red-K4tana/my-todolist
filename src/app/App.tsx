import {useEffect} from 'react';
import './App.module.css';
import {TodolistsList} from "app/components/TodolistsList/TodolistsList";
import sl from './App.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from 'app/redux/store';
import { RequestStatusType} from 'app/redux/appReducer';
import {Routes, Route, NavLink} from 'react-router-dom';
import {Login} from 'app/components/Login/Login';
import {Error404} from 'app/components/Error404/Error404';
import {ErrorSnackbar} from 'app/components/ErrorSkackbar/ErrorSnackbar';
import {authActions, authLogoutTC, authMeTC} from 'app/redux/authReducer';


export const App = () => {
    const appStatusRequest = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const isInit = useSelector<AppRootStateType, boolean>(state => state.app.isInit)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        document.title = 'My Todolist'
    }, [])

    useEffect(() => {
        dispatch(authMeTC())
    },[])

    const logoutHandler = () => {
        dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
        dispatch(authLogoutTC())
    }

    return (
        <div className={sl.app}>
            {appStatusRequest === 'loading' &&
            <div className={sl.preloader}>
                <div className={sl.preloader__row}>
                    <div className={sl.loader}></div>
                </div>
            </div>
            }
            <div className={isInit ? sl.app : sl.appOpacity}>
                <header className={sl.appHeader}>
                    <h1>TODOLIST</h1>
                    {isLoggedIn && <div className={sl.navLinks} onClick={logoutHandler}>
                        <NavLink to={'login'} className={sl.link}>
                            Logout
                        </NavLink>
                    </div>}
                </header>

                {error && <ErrorSnackbar error={error}/>}
                <>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList/>}/>
                        <Route path={'login'} element={<Login/>}/>
                        <Route path={'*'} element={<Error404/>}/>
                    </Routes>
                </>
            </div>
        </div>
  );
}