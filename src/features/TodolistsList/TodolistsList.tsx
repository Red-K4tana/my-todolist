import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from 'app/store';
import {
    TodolistStateType,
    todolistsThunks
} from 'features/TodolistsList/Todolist/todolistsReducer';
import {Todolist} from 'features/TodolistsList/Todolist/Todolist';
import sl from 'features/TodolistsList/Todolist/Todolist.module.css';
import {Navigate} from "react-router-dom";
import {AddItemForm} from 'common/components';

export const TodolistsList = React.memo ( () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const todolists = useSelector<AppRootStateType, Array<TodolistStateType>>(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(todolistsThunks.getTodolists())
        }
    }, [])

    const addTodolist = (title: string) => {
        dispatch(todolistsThunks.addNewTodolist(title))
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