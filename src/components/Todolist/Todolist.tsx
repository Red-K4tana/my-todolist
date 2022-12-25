import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../redux/store";
import {addTaskTC} from "../../redux/tasksReducer";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    removeTodolistTC,
    TodolistFilterType,
    TodolistStateType
} from "../../redux/todolistsReducer";
import {Task} from "../Task/Task";
import {Button} from "../Button/Button";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import sl from './Todolist.module.css';
import slBtnActive from '../Button/Button.module.css';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../API/todolistAPI";

type TodolistPropsType = {
    todolistID: string
}


export const Todolist = (props: TodolistPropsType) => {
    const todolist = useSelector<AppRootStateType, TodolistStateType>(state => state.todolists
        .filter(tl => tl.id === props.todolistID)[0])
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistID])
    const dispatch = useAppDispatch()



    const addTaskItem = (title: string) => {
        dispatch(addTaskTC(props.todolistID, title))
    }
    const removeTodolist = () => {
        dispatch(removeTodolistTC(props.todolistID))
    }
    const changeTodolistTitle = (newTitle: string) => {
        dispatch(changeTodolistTitleTC(props.todolistID, newTitle))
    }
    const changeTodolistFilter = (filter: TodolistFilterType)=> {
        dispatch(changeTodolistFilterAC(props.todolistID, filter))
    }

    let tasksForRender: Array<TaskType> = tasks;

    if (todolist.filter === "Active") {
        tasksForRender = tasks.filter(t => t.status === TaskStatuses.New)
    } else if (todolist.filter === "Completed") {
        tasksForRender = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div className={sl.todolistContainer}>
            <div className={sl.todolistTitle}>
                <EditableSpan title={todolist.title} callback={changeTodolistTitle}/>
                <Button name={'Remove TL'} callback={removeTodolist} style={sl.removeItemButton} classNameSpanButton={sl.classNameSpanRemoveItem}/>
            </div>
            <div className={sl.addItemForm_addTask}>
                <AddItemForm addItem={addTaskItem} textButton={'+'}  placeholder={'Task name'}/>
            </div>
            {tasks.length !== 0 && <div className={sl.tasksAndButtonSort}>

                <div className={sl.tasksContainer}>
                    {tasksForRender.map(task => {
                        return (
                            <div key={task.id}>
                                <Task
                                    todolistID={props.todolistID}
                                    taskID={task.id}
                                />
                            </div>
                        )
                    })}
                </div>

                <div className={sl.button_of_filter_container}>
                    <Button name={'All'} callback={() => changeTodolistFilter('All')}
                            style={todolist.filter === 'All' ? slBtnActive.active_button_of_filter : ''}/>

                    <Button name={'Active'} callback={() => changeTodolistFilter('Active')}
                            style={todolist.filter === 'Active' ? slBtnActive.active_button_of_filter : ''}/>

                    <Button name={'Completed'} callback={() => changeTodolistFilter('Completed')}
                            style={todolist.filter === 'Completed' ? slBtnActive.active_button_of_filter : ''}/>
                </div>
            </div>
            }
        </div>
    );
};

