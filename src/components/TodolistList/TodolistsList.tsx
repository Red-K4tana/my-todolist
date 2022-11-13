import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {AddTodolistAC, TodolistType} from "../../redux/todolistsReducer";
import {Todolist} from "../Todolist/Todolist";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import { v1 } from 'uuid';






export const TodolistsList = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodolist = (title: string) => {
        const newTodolistID = v1()
        dispatch(AddTodolistAC(newTodolistID, title))
    }


    return (
        <div className={'todolistList'}>
            <AddItemForm textButton={'Add TL'} addItem={addTodolist}/>
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
    );
};