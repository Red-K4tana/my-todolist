import React, {ChangeEvent, FC, memo, useCallback, useState} from 'react';
import {useSelector} from "react-redux";
import {AppRootState} from 'app/store';
import {
	tasksThunks,
	updateDomainTaskModelType,
} from 'features/TodolistsList/Task/tasksReducer';
import sl from 'features/TodolistsList/Todolist/Todolist.module.css'
import {Button} from 'common/components';
import {EditModal} from 'common/components';
import {TaskItem} from 'features/TodolistsList/todolistApi';
import {TaskStatuses} from 'common/commonEmuns';
import {useActions} from 'common/hooks';


type TaskProps = {
	todolistID: string
	taskID: string
}

export const Task: FC<TaskProps> = memo(({todolistID, taskID}) => {
	console.log('Task render')
	const task = useSelector<AppRootState, TaskItem>(state =>
		state.tasks[todolistID]
		.filter(task => task.id === taskID)[0])
	const {removeTask, updateTask} = useActions(tasksThunks)

	const removeTaskHandler = () => {
		removeTask({todolistID, taskID})
	}
	const changeTaskTitle = (newTitle: string) => {
		const changeableData: updateDomainTaskModelType = {title: newTitle}
		updateTask({todolistID, taskID, changeableData})
	}
	const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
		const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
		const changeableData: updateDomainTaskModelType = {status}
		updateTask({todolistID, taskID, changeableData})
	}
	//====================================================================================================================
	const [viewMode, setViewMode] = useState<boolean>(false) // show modal window

	// preparing task.title for show (check char amount)
	const showTaskTitle: string = task.title.length >= 17 ? task.title.substring(0, 17) + '...' : task.title.substring(0, 17)

	return (
		<div className={sl.taskItem}>

			<div className={sl.delCheckSpan}>
				<Button name={'del'}
				        callback={removeTaskHandler}
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
					{viewMode &&
            <EditModal viewModeStyle={viewMode} title={task.title} callbackToDispatchTitle={changeTaskTitle}
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