import React, {ChangeEvent, useState} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from 'app/redux/store';
import {removeTaskTC, updateDomainTaskModelType, updateTaskTC} from 'app/redux/tasksReducer';
import sl from 'app/components/Todolist/Todolist.module.css'
import {Button} from 'app/components/Button/Button';
import {TaskStatuses, TaskType} from 'API/todolistAPI';
import {EditModal} from 'app/components/EditModal/EditModal';

type TaskPropsType = {
	todolistID: string
	taskID: string
}

export const Task = React.memo ( (props: TaskPropsType) => {
	const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todolistID]
		.filter(task => task.id === props.taskID)[0])
	const dispatch = useAppDispatch()

	const removeTask = () => {
		dispatch(removeTaskTC(props.todolistID, props.taskID))
	}
	const changeTaskTitle = (newTitle: string) => {
		const model: updateDomainTaskModelType = {title: newTitle}
		dispatch(updateTaskTC(props.todolistID, props.taskID, model))
	}
	const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
		const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
		const model: updateDomainTaskModelType = {status}
		dispatch(updateTaskTC(props.todolistID, props.taskID, model))
	}
	//====================================================================================================================
	const [viewMode, setViewMode] = useState<boolean>(false) // отображение модального окна

	const showTaskTitle: string = task.title.length >= 17 ? task.title.substring(0, 17) + '...' : task.title.substring(0, 17) // подготовка task.title к отображению

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