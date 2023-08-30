import {ChangeEvent, FC, memo, useState} from 'react';
import {Button} from 'common/components';
import styleAIF from './AddItemForm.module.css';
import styleTL from 'features/TodolistsList/Todolist/Todolist.module.css'
import {Input} from 'common/components/Input/Input';
import {appActions} from 'app/appReducer';
import {useActions, useAppDispatch} from 'common/hooks';


type AddItemFormProps = {
	textButton: string
	addItem: (title: string) => void
	placeholder: string
}


export const AddItemForm: FC<AddItemFormProps> = memo(({
	                            textButton,
	                            addItem,
	                            placeholder,
                            }) => {
	const { setAppError } = useActions(appActions)
	const [title, setTitle] = useState<string>('')
	const [error, setError] = useState<boolean>(false) // если true появится красный placeholder 'Empty field'

	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
		setError(false)
	}
	const addItemAndCheckTitleHandler = () => {
		const trimmedTitle = title.trim()
		if (trimmedTitle.length > 0) {
			if (trimmedTitle.length > 27) {
				setAppError({error: 'Title`s length should be less than 20 chars'})
			} else {
				setAppError({error: null})
				addItem(trimmedTitle)
				setTitle('')
			}
		} else {
			setError(true)
		}
	}

	return (
		<div className={styleAIF.addItemForm_addTask}>
			<div className={styleAIF.addItemForm_Input_and_Button}>
				<Input value={title}
							 callbackForOnChange={changeTitle}
							 callbackDispatchValue={addItemAndCheckTitleHandler}
							 situationalStyle={error ? 'placeholderColor' : ''}
							 placeholder={error ? 'Empty field' : placeholder}
				/>
				<Button name={textButton}
								callback={addItemAndCheckTitleHandler}
								style={styleTL.addItemButton}
								classNameSpanButton={styleTL.classNameSpanAddItem}/>
			</div>
		</div>
	);
});

