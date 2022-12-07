import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../redux/store";
import { addTodolistTC, getTodolistsTC, TodolistStateType} from "../../redux/todolistsReducer";
import {Todolist} from "../Todolist/Todolist";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import sl from '.././Todolist/Todolist.module.css';




export const TodolistsList = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistStateType>>(state => state.todolists)
    const dispatch = useAppDispatch()

    const addTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    useEffect(()=> {
        dispatch(getTodolistsTC())
    }, [])

    return (
        <div className={sl.todolistsList}>
            <div className={sl.addItemForm_addTL}>
                <AddItemForm textButton={'Add TL'}
                             addItem={addTodolist}

                             placeholder={'Todolist name'}
                />
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