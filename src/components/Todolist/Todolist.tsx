import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {AddTaskAC, TasksStateType, TaskType} from "../../redux/tasksReducer";
import {AddTodolistAC, TodolistType} from "../../redux/todolistsReducer";
import {Task} from "../Task/Task";
import {Button} from "../Button/Button";
import {AddItemForm} from "../AddItemForm/AddItemForm";


type TodolistPropsType = {
    todolistID: string
}


export const Todolist = (props: TodolistPropsType) => {
    const todolist = useSelector<AppRootStateType, TodolistType>(state => state.todolists
        .filter(tl => tl.id === props.todolistID)[0])
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistID])
    const dispatch = useDispatch()

    const addTaskItem = (title: string) => {
        dispatch(AddTaskAC(props.todolistID, title))
    }


    return (
        <div className={'todolistItem'}>
            <div className={'todolistTitle'}>{todolist.title}</div>
            <AddItemForm addItem={addTaskItem} textButton={'+'}/>
            <div className={'tasksContainer'}>
                {tasks.map(task => {

                    return (
                        <div key={task.id}>
                                <Task
                                    todolistID = {props.todolistID}
                                    taskID = {task.id}
                                />
                        </div>
                    )
                })}
            </div>

        </div>
    );
};

