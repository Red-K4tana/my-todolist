import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {TaskType} from "../../redux/tasksReducer";


type TaskPropsType = {
    todolistID: string
    taskID: string
}

export const Task = (props: TaskPropsType) => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todolistID]
        .filter(task => task.id === props.taskID)[0])



    return (
        <div className={'task'}>
            <li className={'taskTitle'}>{task.title}</li>
        </div>
    );
};

