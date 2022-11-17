import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {AddTaskAC, TasksStateType, TaskType} from "../../redux/tasksReducer";
import {
    AddTodolistActionType,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    TodolistType
} from "../../redux/todolistsReducer";
import {Task} from "../Task/Task";
import {Button} from "../Button/Button";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import sl from './Todolist.module.css'
import {EditableSpan} from "../EditableSpan/EditableSpan";

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
    const removeTodolist = () => {
        dispatch(RemoveTodolistAC(props.todolistID))
    }
    const changeTodolistTitle = (newTitle: string) => {
        dispatch(ChangeTodolistTitleAC(props.todolistID, newTitle))
    }

    return (
        <div className={sl.todolistContainer}>
            <div className={sl.todolistTitle}>
                <EditableSpan title={todolist.title} callback={changeTodolistTitle}/>
                <button onClick={removeTodolist}>Remove TL</button>
            </div>
            <div className={sl.addItemForm_addTask}>
                <AddItemForm addItem={addTaskItem} textButton={'+'}/>
            </div>
            <div className={sl.tasksContainer}>
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

