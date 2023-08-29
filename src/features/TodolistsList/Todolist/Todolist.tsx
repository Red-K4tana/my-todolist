import {useSelector} from 'react-redux';
import {AppRootStateType} from 'app/store';
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
import {TaskType} from 'features/TodolistsList/todolistApi';
import {TaskStatuses} from 'common/commonEmuns';
import {useEffect} from 'react';
import {useActions} from 'common/hooks';

type TodolistPropsType = {
	todolistID: string
}

export const Todolist = (props: TodolistPropsType) => {
	const todolist = useSelector<AppRootStateType, TodolistStateType>(state =>
		state.todolists
		.filter(tl => tl.id === props.todolistID)[0])
	const tasks = useSelector<AppRootStateType, Array<TaskType>>(state =>
		state.tasks[props.todolistID])
	const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks)
	const {getTasks, addTask} = useActions(tasksThunks)
	const {changeTodolistFilter} = useActions(todolistsActions)
	const buttonsTextOfFilter: TodolistFilterType[] = ['All', 'Active', 'Completed']

	useEffect(() => {
		getTasks(props.todolistID)
	}, [])

	const addTaskItem = (title: string) => {
		addTask({todolistID: props.todolistID, title})
	}
	const removeTodolistHandler = () => {
		removeTodolist(props.todolistID)
	}
	const changeTodolistTitleHandler = (newTitle: string) => {
		changeTodolistTitle({todolistID: props.todolistID, newTitle})
	}
	const changeTodolistFilterHandler = (filter: TodolistFilterType) => {
		changeTodolistFilter({todolistID: props.todolistID, filter})
	}

	let tasksForRender: Array<TaskType> = tasks;

	if (todolist.filter === 'Active') {
		tasksForRender = tasks.filter(t => t.status === TaskStatuses.New)
	} else if (todolist.filter === 'Completed') {
		tasksForRender = tasks.filter(t => t.status === TaskStatuses.Completed)
	}

	return (
		<div className={sl.todolist}>
			<div className={sl.todolistTitle}>
				<EditableSpan title={todolist.title} callback={changeTodolistTitleHandler}/>
				<Button name={'Remove TL'}
				        callback={removeTodolistHandler}
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
					{buttonsTextOfFilter.map((buttonText, index) => {
						return (
							<Button key={index} name={buttonText} callback={() => changeTodolistFilterHandler(buttonText)}
							        style={todolist.filter === buttonText ? sl.active_button_of_filter : sl.button_of_filter}
							/>
						)
					})}
				</div>
			</div>
			}
		</div>
	);
};
