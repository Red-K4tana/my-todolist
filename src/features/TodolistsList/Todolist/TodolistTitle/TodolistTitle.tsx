import React, {FC} from 'react';
import styleTLTitle from './TodolistTitle.module.css';
import styleTL from '../Todolist.module.css';
import {TodolistStateType, todolistsThunks} from "../todolistsReducer";
import {useActions} from "common/hooks";
import {Button, EditableSpan} from "common/components";


type TodolistTitleProps = {
	todolist: TodolistStateType
}

export const TodolistTitle: FC<TodolistTitleProps> = React.memo(({ todolist}) => {
	const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks)

	const removeTodolistHandler = () => {
		removeTodolist(todolist.id)
	}
	const changeTodolistTitleHandler = (newTitle: string) => {
		changeTodolistTitle({todolistID: todolist.id, newTitle})
	}


	return (
		<div className={styleTLTitle.todolistTitle}>
			<EditableSpan title={todolist.title} callback={changeTodolistTitleHandler}/>
			<Button name={'Remove TL'}
			        callback={removeTodolistHandler}
			        style={styleTL.removeItemButton}
			        classNameSpanButton={styleTL.classNameSpanRemoveItem}
			/>
		</div>
	);
});
