import React, {FC, memo} from 'react';
import styleBOFC from 'features/TodolistsList/Todolist/ButtonOfFilterContainer/ButtonOfFilterContainer.module.css';
import {Button} from "common/components";
import {
	TodolistFilterType,
	todolistsActions,
	TodolistStateType
} from "features/TodolistsList/Todolist/todolistsReducer";
import {useActions} from "common/hooks";


type ButtonOfFilterContainerProps = {
	todolist: TodolistStateType
}


export const ButtonOfFilterContainer: FC<ButtonOfFilterContainerProps> = memo(({todolist}) => {
	const {changeTodolistFilter} = useActions(todolistsActions)
	const buttonsTextOfFilter: TodolistFilterType[] = ['All', 'Active', 'Completed']

	const changeTodolistFilterHandler = (filter: TodolistFilterType) => {
		changeTodolistFilter({todolistID: todolist.id, filter})
	}

	return (
		<div className={styleBOFC.button_of_filter_container}>
			{buttonsTextOfFilter.map((buttonText, index) => {
				return (
					<Button key={index}
					        name={buttonText}
					        callback={() => changeTodolistFilterHandler(buttonText)}
					        style={todolist.filter === buttonText ? styleBOFC.active_button_of_filter : styleBOFC.button_of_filter}
					/>
				)
			})}
		</div>
	);
});
