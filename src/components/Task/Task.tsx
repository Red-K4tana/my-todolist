import React, {ChangeEvent} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../redux/store";
import {removeTaskAC, updateDomainTaskModelType, updateTaskTC} from "../../redux/tasksReducer";
import sl from '../Todolist/Todolist.module.css'
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button} from "../Button/Button";
import {TaskStatuses, TaskType} from "../../API/todolistAPI";

type TaskPropsType = {
    todolistID: string
    taskID: string
}

export const Task = (props: TaskPropsType) => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todolistID]
        .filter(task => task.id === props.taskID)[0])
    const dispatch = useAppDispatch()

    const removeTask = () => {
        dispatch(removeTaskAC(props.todolistID, props.taskID))
    }
    const changeTaskTitle = (newTitle: string) => {
        const model: updateDomainTaskModelType = {title: newTitle}
        dispatch(updateTaskTC(props.todolistID, props.taskID, model))
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        const model: updateDomainTaskModelType = {status}
        dispatch(updateTaskTC(props.todolistID, props.taskID, model))
    }


    return (
        <div className={sl.taskItem}>
            <Button name={'-'} callback={removeTask} style={'button'}/>
            <input type={'checkbox'} checked={task.status === TaskStatuses.Completed} onChange={changeTaskStatus}/>
            <li className={'taskTitle'}>
                <EditableSpan title={task.title} callback={changeTaskTitle}/>
            </li>
        </div>
    );
};

