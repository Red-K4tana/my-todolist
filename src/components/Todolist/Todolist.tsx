import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {AddTaskAC, TasksStateType} from "../../redux/tasksReducer";
import {
    AddTodolistActionType, ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC, TodolistFilterType,
    TodolistStateType
} from "../../redux/todolistsReducer";
import {Task} from "../Task/Task";
import {Button} from "../Button/Button";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import sl from './Todolist.module.css'
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {TaskType} from "../../API/todolistAPI";

type TodolistPropsType = {
    todolistID: string
}


export const Todolist = (props: TodolistPropsType) => {
    const todolist = useSelector<AppRootStateType, TodolistStateType>(state => state.todolists
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
    const changeTodolistFilter = (filter: TodolistFilterType)=> {
        dispatch(ChangeTodolistFilterAC(props.todolistID, filter))
    }

    let tasksForRender: Array<TaskType> = tasks;

    if (todolist.filter === "Active") {
        tasksForRender = tasks.filter(t => t.status === 1)
    } else if (todolist.filter === "Completed") {
        tasksForRender = tasks.filter(t => t.status === 2)
    }
    debugger

    return (
        <div className={sl.todolistContainer}>
            <div className={sl.todolistTitle}>
                <EditableSpan title={todolist.title} callback={changeTodolistTitle}/>
                <Button name={'Remove TL'} callback={removeTodolist} style={'button'}/>
            </div>
            <div className={sl.addItemForm_addTask}>
                <AddItemForm addItem={addTaskItem} textButton={'+'} inputStyle={'addTasksInput'} placeholder={'Task name'}/>
            </div>
            <div className={sl.tasksContainer}>
                {tasksForRender.map(task => {
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
            <div className={sl.button_of_filter_container}>
                <Button name={'All'} callback={()=>changeTodolistFilter('All')}
                        style={todolist.filter === 'All' ? 'active_button_of_filter' : 'button'}/>

                <Button name={'Active'} callback={()=>changeTodolistFilter('Active')}
                        style={todolist.filter === 'Active' ? 'active_button_of_filter' : 'button'}/>

                <Button name={'Completed'} callback={()=>changeTodolistFilter('Completed')}
                        style={todolist.filter === 'Completed' ? 'active_button_of_filter' : 'button'}/>
            </div>
        </div>
    );
};

