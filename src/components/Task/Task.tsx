import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {RemoveTaskAC, TaskType} from "../../redux/tasksReducer";
import sl from '../Todolist/Todolist.module.css'

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

    return (
        <div className={sl.taskItem}>
            <button onClick={removeTask}>-</button>
            <li className={'taskTitle'}>{task.title}</li>
        </div>
    );
};

