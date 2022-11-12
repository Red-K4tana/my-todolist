import React from 'react';
import './App.css';
import {TodolistsList} from "./components/TodolistList/TodolistsList";

function App() {


  return (
    <div className="App">
      <header className="App-header">
          <h1>TODOLIST</h1>
      </header>
        <TodolistsList />
    </div>
  );
}

export default App;
