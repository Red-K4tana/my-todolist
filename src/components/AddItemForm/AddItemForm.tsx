import {ChangeEvent, useState} from 'react';
import {Button} from 'components/Button/Button';
import sl from "features/TodolistsList/Todolist/Todolist.module.css";
import {Input} from 'components/Input/Input';
import {useAppDispatch} from 'app/store';
import {appActions} from 'app/appReducer';


type AddItemFormPropsType = {
	textButton: string
	addItem: (title: string) => void
	placeholder: string
}


export const AddItemForm = (props: AddItemFormPropsType) => {
	const dispatch = useAppDispatch()
	const [title, setTitle] = useState<string>('')
	const [error, setError] = useState<boolean>(false) // если true появится красный placeholder 'Empty field'

	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
		setError(false)
	}
	const addItem = () => {
		const trimmedTitle = title.trim()
		if (trimmedTitle.length > 0) {
			if (trimmedTitle.length > 27) {
				dispatch(appActions.setAppError({error: 'Title`s length should be less than 20 chars'}))
			} else {
				dispatch(appActions.setAppError({error: null}))
				props.addItem(trimmedTitle)
				setTitle('')
			}
		} else {
			setError(true)
		}
	}

	return (
		<>
			<div className={sl.addItemForm_Input_and_Button}>
				<Input value={title}
							 callbackForOnChange={changeTitle}
							 callbackDispatchValue={addItem}
							 situationalStyle={error ? 'placeholderColor' : ''}
							 placeholder={error ? 'Empty field' : props.placeholder}
				/>
				<Button name={props.textButton}
								callback={addItem}
								style={sl.addItemButton}
								classNameSpanButton={sl.classNameSpanAddItem}/>
			</div>
		</>
	);
};

