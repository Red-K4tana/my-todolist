import React, {FC} from 'react';
import styleBOFC from 'features/TodolistsList/Todolist/ButtonOfFilterContainer/ButtonOfFilterContainer.module.css';
import {Button} from "common/components";
import {TodolistFilterType, TodolistStateType} from "features/TodolistsList/Todolist/todolistsReducer";


type ButtonOfFilterContainerProps = {
	buttonsTextOfFilter: TodolistFilterType[]
	todolist: TodolistStateType
	changeTodolistFilterHandler: (filter: TodolistFilterType) => void
}


export const ButtonOfFilterContainer: FC<ButtonOfFilterContainerProps> = ({buttonsTextOfFilter,
	                                                                          todolist,
	                                                                          changeTodolistFilterHandler,
                                                                          }) => {
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
};
