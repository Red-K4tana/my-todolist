import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {AddTaskAC, TasksStateType, TaskType} from "../../redux/tasksReducer";
import {
    AddTodolistActionType, ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC, TodolistFilterType,
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
    const changeTodolistFilter = (filter: TodolistFilterType)=> {
        dispatch(ChangeTodolistFilterAC(props.todolistID, filter))
    }

    let tasksForRender: Array<TaskType> = tasks;

    if (todolist.filter === "Active") {
        tasksForRender = tasks.filter(t => t.isDone === false)
    } else if (todolist.filter === "Completed") {
        tasksForRender = tasks.filter(t => t.isDone === true)
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
            <div className={sl.button_of_filter}>
                <Button name={'All'} callback={()=>changeTodolistFilter('All')}
                        style={todolist.filter === 'All' ? 'active_button_of_filter' : ''}/>

                <Button name={'Active'} callback={()=>changeTodolistFilter('Active')}
                        style={todolist.filter === 'Active' ? 'active_button_of_filter' : ''}/>

                <Button name={'Completed'} callback={()=>changeTodolistFilter('Completed')}
                        style={todolist.filter === 'Completed' ? 'active_button_of_filter' : ''}/>
            </div>

        </div>
    );
};

