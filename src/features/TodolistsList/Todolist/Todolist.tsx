import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from 'app/store';
import {
    changeTodolistTitleTC,
    removeTodolistTC, todolistsActions,
    TodolistFilterType,
    TodolistStateType
} from 'features/TodolistsList/Todolist/todolistsReducer';
import {Task} from 'features/TodolistsList/Task/Task';
import {Button} from 'common/components';
import sl from './Todolist.module.css';
import {EditableSpan} from 'common/components';
import {TaskStatuses, TaskType} from 'api/todolistAPI';
import {tasksThunks} from 'features/TodolistsList/Task/tasksReducer';
import {AddItemForm} from 'common/components';

type TodolistPropsType = {
    todolistID: string
}

export const Todolist = (props: TodolistPropsType) => {
    const todolist = useSelector<AppRootStateType, TodolistStateType>(state => state.todolists
        .filter(tl => tl.id === props.todolistID)[0])
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistID])
    const dispatch = useAppDispatch()

    const addTaskItem = (title: string) => {
        dispatch(tasksThunks.addTask({todolistID: props.todolistID, title}))
    }
    const removeTodolist = () => {
        dispatch(removeTodolistTC(props.todolistID))
    }
    const changeTodolistTitle = (newTitle: string) => {
        dispatch(changeTodolistTitleTC(props.todolistID, newTitle))
    }
    const changeTodolistFilter = (filter: TodolistFilterType) => {
        dispatch(todolistsActions.changeTodolistFilter({todolistID: props.todolistID, filter}))
    }

    let tasksForRender: Array<TaskType> = tasks;

    if (todolist.filter === "Active") {
        tasksForRender = tasks.filter(t => t.status === TaskStatuses.New)
    } else if (todolist.filter === "Completed") {
        tasksForRender = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div className={sl.todolist}>
            <div className={sl.todolistTitle}>
                <EditableSpan title={todolist.title} callback={changeTodolistTitle}/>
                <Button name={'Remove TL'}
                        callback={removeTodolist}
                        style={sl.removeItemButton}
                        classNameSpanButton={sl.classNameSpanRemoveItem}
                />
            </div>
            <div className={sl.addItemForm_addTask}>
                <AddItemForm addItem={addTaskItem} textButton={'+'} placeholder={'Task name'}/>
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
                            style={todolist.filter === 'All' ? sl.active_button_of_filter : sl.button_of_filter}/>
                    <Button name={'Active'} callback={() => changeTodolistFilter('Active')}
                            style={todolist.filter === 'Active' ? sl.active_button_of_filter : sl.button_of_filter}/>
                    <Button name={'Completed'} callback={() => changeTodolistFilter('Completed')}
                            style={todolist.filter === 'Completed' ? sl.active_button_of_filter : sl.button_of_filter}/>
                </div>
            </div>
            }
        </div>
    );
};