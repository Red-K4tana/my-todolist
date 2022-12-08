import React from 'react';
import './App.module.css';
import {TodolistsList} from "./components/TodolistsList/TodolistsList";
import sl from './App.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import { RequestStatusType} from "./redux/appReducer";
import {Routes, Route, NavLink, Link} from 'react-router-dom';
import {Login} from "./components/Login/Login";
import {Error404} from "./components/Error404/Error404";
import {Button} from "./components/Button/Button";


export function App() {
    const appStatusRequest = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)



    return (
    <div className={sl.app}>
      <header className={sl.appHeader}>
          <h1>TODOLIST</h1>

      </header>
        { appStatusRequest === 'loading' &&
        <div className={sl.preloader}>
            <div className={sl.preloader__row}>
                <div className={sl.loader}></div>
            </div>
        </div>
        }

        <>
            <Routes>
                <Route path={'/'} element={<TodolistsList />}/>
                <Route path={'/login'} element={<Login />}/>
                <Route path={'*'} element={<Error404 />}/>
            </Routes>
        </>


    </div>
  );
}

