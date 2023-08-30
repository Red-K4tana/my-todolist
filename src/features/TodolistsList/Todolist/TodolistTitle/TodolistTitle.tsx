import React, {FC} from 'react';
import {Button, EditableSpan} from "../../../../common/components";
import styleTLTitle from './TodolistTitle.module.css';
import styleTL from '../Todolist.module.css';
import {TodolistStateType} from "../todolistsReducer";


type TodolistTitleProps = {
	todolist: TodolistStateType
	changeTodolistTitleHandler: (newTitle:string) => void
	removeTodolistHandler: () => void
}

export const TodolistTitle: FC<TodolistTitleProps> = React.memo(({
	                                                                 todolist,
	                                                                 changeTodolistTitleHandler,
	                                                                 removeTodolistHandler,
                                                                 }) => {
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
