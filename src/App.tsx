import React from 'react';
import './App.module.css';
import {TodolistsList} from "./components/TodolistsList/TodolistsList";
import sl from './App.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import { RequestStatusType} from "./redux/appReducer";
import {Routes, Route, NavLink} from 'react-router-dom';
import {Login} from "./components/Login/Login";
import {Error404} from "./components/Error404/Error404";
import {ErrorSnackbar} from "./components/ErrorSkackbar/ErrorSnackbar";
import {Fibonacci} from "./components/fibonacci/Fibonacci";

export function App() {
    const appStatusRequest = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)

    return (
    <div className={sl.app}>
      <header className={sl.appHeader}>
          <h1>TODOLIST</h1>
          <div className={sl.navLinks} >
              <NavLink to={'login'} className={({isActive})=> isActive ? sl.activeLink : sl.link}>
                  Login
              </NavLink>
              <NavLink to={'/'} className={({isActive})=> isActive ? sl.activeLink : sl.link}>
                  Todolists
              </NavLink>
              {/*<NavLink to={'fibonacci'} className={({isActive})=> isActive ? sl.activeLink : sl.link}>
                  Fibonacci
              </NavLink>*/}
          </div>
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
                {/*<Route path={'fibonacci'} element={<Fibonacci />}/>*/}
                <Route path={'*'} element={<Error404 />}/>
            </Routes>
        </>
    </div>
  );
}

