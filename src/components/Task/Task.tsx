import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {ChangeTaskTitleAC, RemoveTaskAC, TaskType} from "../../redux/tasksReducer";
import sl from '../Todolist/Todolist.module.css'
import {EditableSpan} from "../EditableSpan/EditableSpan";

type TaskPropsType = {
    todolistID: string
    taskID: string
}

export const Task = (props: TaskPropsType) => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todolistID]
        .filter(task => task.id === props.taskID)[0])
    const dispatch = useDispatch()

    const removeTask = () => {
        dispatch(RemoveTaskAC(props.todolistID, props.taskID))
    }
    const changeTaskTitle = (newTitle: string) => {
        dispatch(ChangeTaskTitleAC(props.todolistID, props.taskID, newTitle))
    }

    return (
        <div className={sl.taskItem}>
            <button onClick={removeTask}>-</button>
            <li className={'taskTitle'}>
                <EditableSpan title={task.title} callback={changeTaskTitle}/>
            </li>
        </div>
    );
};

