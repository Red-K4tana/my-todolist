import {useSelector} from 'react-redux';
import {AppRootState} from 'app/store';
import {
	todolistsActions,
	TodolistFilterType,
	TodolistStateType, todolistsThunks
} from 'features/TodolistsList/Todolist/todolistsReducer';
import {Task} from 'features/TodolistsList/Task/Task';
import {Button} from 'common/components';
import sl from './Todolist.module.css';
import {EditableSpan} from 'common/components';
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

export const Todolist: FC<TodolistProps> = memo(({ todolistID }) => {
	const todolist = useSelector<AppRootState, TodolistStateType>(state =>
		state.todolists
		.filter(tl => tl.id === todolistID)[0])
	const tasks = useSelector<AppRootState, Array<TaskItem>>(state =>
		state.tasks[todolistID])
	const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks)
	const {getTasks, addTask} = useActions(tasksThunks)
	const {changeTodolistFilter} = useActions(todolistsActions)
	const buttonsTextOfFilter: TodolistFilterType[] = ['All', 'Active', 'Completed']

	useEffect(() => {
		getTasks(todolistID)
	}, [])

	const addTaskItem = (title: string) => {
		addTask({todolistID, title})
	}
	const removeTodolistHandler = () => {
		removeTodolist(todolistID)
	}
	const changeTodolistTitleHandler = (newTitle: string) => {
		changeTodolistTitle({todolistID, newTitle})
	}
	const changeTodolistFilterHandler = (filter: TodolistFilterType) => {
		changeTodolistFilter({todolistID, filter})
	}

	let tasksForRender: Array<TaskItem> = tasks;

	if (todolist.filter === 'Active') {
		tasksForRender = tasks.filter(t => t.status === TaskStatuses.New)
	} else if (todolist.filter === 'Completed') {
		tasksForRender = tasks.filter(t => t.status === TaskStatuses.Completed)
	}

	return (
		<div className={sl.todolist}>
			<TodolistTitle todolist={todolist}
			               changeTodolistTitleHandler={changeTodolistTitleHandler}
			               removeTodolistHandler={removeTodolistHandler}/>
			<AddItemForm addItem={addTaskItem} textButton={'+'} placeholder={'Task name'}/>

			{tasks.length !== 0 && <div className={sl.tasksAndButtonSort}>
				<div className={sl.tasksContainer}>
					{tasksForRender.map(task => {
						return (
							<div key={task.id}>
								<Task
									todolistID={todolistID}
									taskID={task.id}
								/>
							</div>
						)
					})}
				</div>
				<ButtonOfFilterContainer buttonsTextOfFilter={buttonsTextOfFilter}
				                         todolist={todolist}
				                         changeTodolistFilterHandler={changeTodolistFilterHandler} />
			</div>
			}
		</div>
	);
});
