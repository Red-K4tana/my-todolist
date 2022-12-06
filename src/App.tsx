import React from 'react';
import './App.module.css';
import {TodolistsList} from "./components/TodolistsList/TodolistsList";
import sl from './App.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import { RequestStatusType} from "./redux/appReducer";

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

        <TodolistsList />
    </div>
  );
}

