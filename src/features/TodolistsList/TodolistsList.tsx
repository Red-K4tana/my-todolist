import React, {FC, memo, useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppRootState} from 'app/store';
import {
	TodolistStateType,
	todolistsThunks
} from 'features/TodolistsList/Todolist/todolistsReducer';
import {Todolist} from 'features/TodolistsList/Todolist/Todolist';
import sl from 'features/TodolistsList/Todolist/Todolist.module.css';
import {Navigate} from "react-router-dom";
import {AddItemForm} from 'common/components';
import {useActions} from 'common/hooks';

export const TodolistsList: FC = () => {
	const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
	const todolists = useSelector<AppRootState, Array<TodolistStateType>>(state => state.todolists)
	const {getTodolists, addNewTodolist} = useActions(todolistsThunks)

	useEffect(() => {
		if (isLoggedIn) {
			getTodolists()
		}
	}, [])

	const addTodolist = (title: string) => {
		//@ts-ignore
		return addNewTodolist(title).unwrap()
	}

	if (!isLoggedIn) {
		return <Navigate to={'/login'}/>
	}

	return (
		<div className={sl.todolistsList}>
			<div className={sl.addItemForm_addTL}>
				<AddItemForm textButton={'Add TL'}
				             addItem={addTodolist}
				             placeholder={'Todolist name'}
				/>
			</div>
			<div className={sl.todolistsContainer}>
				{todolists.map(tl => {
					return (
						<div key={tl.id}>
							<Todolist todolistID={tl.id} />
						</div>
					)
				})
				}
			</div>
		</div>
	);
};