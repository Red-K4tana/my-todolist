import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {TodolistType, AddTodolistAC} from "../../redux/todolistsReducer";
import {Todolist} from "../Todolist/Todolist";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import { v1 } from 'uuid';
import sl from '.././Todolist/Todolist.module.css';



export const TodolistsList = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodolist = (title: string) => {
        const newTodolistID = v1()
        dispatch(AddTodolistAC(newTodolistID, title))
    }


    return (
        <div className={sl.todolistsList}>
            <div className={sl.addItemForm_addTL}>
                <AddItemForm textButton={'Add TL'} addItem={addTodolist} inputStyle={'addTodolistInput'} placeholder={'Todolist name'}/>
            </div>
            <div className={sl.todolists}>
                {todolists.map(tl => {
                    return (
                        <div key={tl.id}>
                            <Todolist
                                todolistID = {tl.id}
                            />
                        </div>
                    )
                })
                }
            </div>
        </div>
    );
};