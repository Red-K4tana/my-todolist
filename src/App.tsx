import React, {useEffect} from 'react';
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
import {authLogoutTC, authMeTC} from "./redux/authReducer";


export function App() {
    const appStatusRequest = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        document.title = 'My Todolist'
    }, [])

    useEffect(() => {
        dispatch(authMeTC())
    },[])

    const logoutHandler = () => {
        dispatch(authLogoutTC())
    }
    return (
    <div className={sl.app}>
      <header className={sl.appHeader}>
          <h1>TODOLIST</h1>
          {isLoggedIn && <div className={sl.navLinks} onClick={logoutHandler}>
              <NavLink to={'login'} className={sl.link}>
                  Logout
              </NavLink>
          </div>}
      </header>
        { appStatusRequest === 'loading' &&
        <div className={sl.preloader}>
            <div className={sl.preloader__row}>
                <div className={sl.loader}></div>
            </div>
        </div>
        }
        {error && <ErrorSnackbar error={error}/>}
        <>
            <Routes>
                <Route path={'/'} element={<TodolistsList />}/>
                <Route path={'login'} element={<Login />}/>
                <Route path={'*'} element={<Error404 />}/>
            </Routes>
        </>
    </div>
  );
}

