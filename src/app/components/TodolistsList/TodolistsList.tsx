import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from 'app/redux/store';
import {addTodolistTC, getTodolistsTC, TodolistStateType} from 'app/redux/todolistsReducer';
import {Todolist} from 'app/components/Todolist/Todolist';
import {AddItemForm} from 'app/components/AddItemForm/AddItemForm';
import sl from 'app/components/Todolist/Todolist.module.css';
import {Navigate} from "react-router-dom";

export const TodolistsList = React.memo ( () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const todolists = useSelector<AppRootStateType, Array<TodolistStateType>>(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        isLoggedIn && dispatch(getTodolistsTC())
    }, [])

    const addTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={sl.todolistsList}>
            <div className={sl.addItemForm_addTL}>
                <AddItemForm textButton={'Add TL'}
                             addItem={addTodolist}
                             placeholder={'Todolist name'}
                />
            </div>
            <div className={sl.todolistsContainer}>
                {todolists.map(tl => {
                    return (
                        <div key={tl.id}>
                            <Todolist
                                todolistID={tl.id}
                            />
                        </div>
                    )
                })
                }
            </div>
        </div>
    );
});