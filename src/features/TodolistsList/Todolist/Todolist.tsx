import {useSelector} from 'react-redux';
import {AppRootState} from 'app/store';
import {TodolistStateType} from 'features/TodolistsList/Todolist/todolistsReducer';
import {Task} from 'features/TodolistsList/Task/Task';
import sl from './Todolist.module.css';
import {tasksThunks} from 'features/TodolistsList/Task/tasksReducer';
import {AddItemForm} from 'common/components';
import {TaskItem} from 'features/TodolistsList/todolistApi';
import {TaskStatuses} from 'common/commonEmuns';
import {FC, memo, useEffect} from 'react';
import {useActions} from 'common/hooks';
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {ButtonOfFilterContainer} from "features/TodolistsList/Todolist/ButtonOfFilterContainer/ButtonOfFilterContainer";

type TodolistProps = {
	todolistID: string
}

export const Todolist: FC<TodolistProps> = ({ todolistID }) => {
	const todolist = useSelector<AppRootState, TodolistStateType>(state =>
		state.todolists
		.filter(tl => tl.id === todolistID)[0])
	const tasks = useSelector<AppRootState, Array<TaskItem>>(state =>
		state.tasks[todolistID])
	const {getTasks, addNewTask} = useActions(tasksThunks)

	useEffect(() => {
		getTasks(todolistID)
	}, [])

	const addTaskItem = (title: string) => {
		//@ts-ignore
		return addNewTask({todolistID, title}).unwrap()
	}



	let tasksForRender: Array<TaskItem> = tasks;

	if (todolist.filter === 'Active') {
		tasksForRender = tasks.filter(t => t.status === TaskStatuses.New)
	} else if (todolist.filter === 'Completed') {
		tasksForRender = tasks.filter(t => t.status === TaskStatuses.Completed)
	}

	return (
		<div className={sl.todolist}>
			<TodolistTitle todolist={todolist}/>
			<AddItemForm addItem={addTaskItem} textButton={'+'} placeholder={'Task name'}/>

			{tasks.length !== 0 && <div className={sl.tasksAndButtonSort}>
				<div className={sl.tasksContainer}>
					{tasksForRender.map(task => {
						return (
								<Task
									key={task.id}
									todolistID={todolistID}
									taskID={task.id}
								/>
						)
					})}
				</div>
				<ButtonOfFilterContainer todolist={todolist}/>
			</div>
			}
		</div>
	);
};
