import React, {ChangeEvent, useState} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from 'app/store';
import {
	tasksThunks,
	updateDomainTaskModelType,
} from 'features/TodolistsList/Task/tasksReducer';
import sl from 'features/TodolistsList/Todolist/Todolist.module.css'
import {Button} from 'common/components';
import {TaskStatuses, TaskType} from 'common/commonApi/commonApi';
import {EditModal} from 'common/components';

type TaskPropsType = {
	todolistID: string
	taskID: string
}

export const Task = React.memo ( (props: TaskPropsType) => {
	const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todolistID]
		.filter(task => task.id === props.taskID)[0])
	const dispatch = useAppDispatch()

	const removeTask = () => {
		dispatch(tasksThunks.removeTask({todolistID: props.todolistID, taskID: props.taskID}))
	}
	const changeTaskTitle = (newTitle: string) => {
		const changeableData: updateDomainTaskModelType = {title: newTitle}
		dispatch(tasksThunks.updateTask({todolistID: props.todolistID, taskID: props.taskID, changeableData}))
	}
	const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
		const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
		const changeableData: updateDomainTaskModelType = {status}
		dispatch(tasksThunks.updateTask({todolistID: props.todolistID, taskID: props.taskID, changeableData}))
	}
	//====================================================================================================================
	const [viewMode, setViewMode] = useState<boolean>(false) // отображение модального окна

	// подготовка task.title к отображению (проверка на количество символов в названии)
	const showTaskTitle: string = task.title.length >= 17 ? task.title.substring(0, 17) + '...' : task.title.substring(0, 17)

	return (
		<div className={sl.taskItem}>

			<div className={sl.delCheckSpan}>
				<Button name={'del'}
			             callback={removeTask}
			             style={sl.removeItemButton}
			             classNameSpanButton={sl.classNameSpanRemoveItem}
			/>
				<label className={task.status === TaskStatuses.Completed ? sl.checkboxChecked : sl.checkboxUnchecked}>
					<input className={sl.checkboxTaskStatus}
					       type={'checkbox'}
					       checked={task.status === TaskStatuses.Completed}
					       onChange={changeTaskStatus}
					/>
				</label>


				<div className={sl.taskTitleSpan}>
					<span className={task.status === TaskStatuses.Completed ? sl.taskCompletedSpan : ''}>{showTaskTitle}</span>
					{viewMode && <EditModal viewModeStyle={viewMode} title={task.title} callbackToDispatchTitle={changeTaskTitle}
					            callbackToViewMode={setViewMode}
					/>}
				</div>
			</div>


			<Button name={'edit'}
			        callback={() => setViewMode(true)}
			        style={sl.viewEditButton}
			        classNameSpanButton={sl.classNameSpanViewEditModal}
			/>
		</div>
	);
});