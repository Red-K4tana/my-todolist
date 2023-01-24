import React, {ChangeEvent, useState} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../redux/store";
import {removeTaskAC, removeTaskTC, updateDomainTaskModelType, updateTaskTC} from "../../redux/tasksReducer";
import sl from '../Todolist/Todolist.module.css'
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button} from "../Button/Button";
import {TaskStatuses, TaskType} from "../../API/todolistAPI";
import {EditModal} from "../EditModal/EditModal";

type TaskPropsType = {
	todolistID: string
	taskID: string
}

export const Task = React.memo((props: TaskPropsType) => {
	/*console.log('RENDER Task')*/

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
	const [viewMode, setViewMode] = useState<boolean>(false)

	return (
		<div className={task.status === TaskStatuses.Completed ? sl.taskItemCompleted : sl.taskItem}>
			<Button name={'-'}
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
			<li className={sl.taskItemLi}>
				<EditableSpan title={task.title} callback={changeTaskTitle}
				/>
				<EditModal viewModeStyle={viewMode} title={task.title} callbackToDispatchTitle={changeTaskTitle}
				           callbackToViewMode={setViewMode}
				/>
			</li>
			<Button name={' ~ '}
			        callback={()=>setViewMode(true)}
			        /*style={}
			        classNameSpanButton={}*/
			/>
		</div>
	);
});