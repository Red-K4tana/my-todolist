import React, {useEffect, useState} from 'react';
import './App.module.css';
import {TodolistsList} from "./components/TodolistsList/TodolistsList";
import sl from './App.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./redux/store";
import { RequestStatusType} from "./redux/appReducer";
import {Routes, Route, NavLink} from 'react-router-dom';
import {Login} from "./components/Login/Login";
import {Error404} from "./components/Error404/Error404";
import {ErrorSnackbar} from "./components/ErrorSkackbar/ErrorSnackbar";
import {authLogoutTC, authMeTC, setIsLoggedInAC} from "./redux/authReducer";


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
        dispatch(setIsLoggedInAC(false))
        dispatch(authLogoutTC())
    }
    //===================================----------------------------------------=======================================
    const Comp = (props: any) => {
        console.log('render Comp')
        const styleObj: any = {
            'color': 'blue',
            'font-size': '20px',
            'font-weight': '400',
            'margin-left': '450px',
            'margin-top': '450px',
        }
        const styleObj2: any = {
            'color': 'red',
            'font-size': '50px',
            'font-weight': '800',
            'margin-left': '450px',
            'margin-top': '450px',
        }
        const [style, setStyle] = useState<any>(styleObj)
        useEffect(()=> {
            console.log('start Timeout')
            const timeout = setTimeout (()=> {
                setStyle(styleObj2)
            },5000)

             clearTimeout(timeout)
        },[])
        return (
          <div style={style}>
              S T R I N G
          </div>
        )
    }
    //------------------------------------------------------------
    const styleDiv: any = {
        'height': '500px',
        'width': '500px',
    }
    //===================================----------------------------------------=======================================
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