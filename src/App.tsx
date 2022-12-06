import React from 'react';
import './App.module.css';
import {TodolistsList} from "./components/TodolistsList/TodolistsList";
import sl from './App.module.css'

function App() {


  return (
    <div className={sl.app}>
      <header className={sl.appHeader}>
          <h1>TODOLIST</h1>
      </header>
        <div className={sl.preloader}>
            <div className={sl.preloader__row}>
                <div className={sl.loader}></div>
            </div>
        </div>
        <TodolistsList />
    </div>
  );
}

export default App;
