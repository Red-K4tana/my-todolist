import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import sl from './EditModal.module.css';
import {useAppDispatch} from "../../redux/store";
import {Button} from "../Button/Button";


type EditModalPropsType = {
	viewModeStyle: boolean
	title: string
	callbackToDispatchTitle: (newTitle: string) => void
	callbackToViewMode: (viewMode: boolean) => void
}

export const EditModal = React.memo((props: EditModalPropsType) => {
	const dispatch = useAppDispatch()

	const [title, setTitle] = useState(props.title)
	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	//====================================================================================================================
	const saveAndInactivateModal = () => {
		props.callbackToDispatchTitle(title)
		props.callbackToViewMode(false)
	}
	const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			props.callbackToViewMode(false)
		}
	}
	return (
		<div className={props.viewModeStyle ? sl.activeModal : sl.inactiveModal}>
			<div className={sl.contentModal}>
				<input value={title}
				       onChange={changeTitle}
				       onBlur={() => props.callbackToViewMode(false)}
				       onKeyPress={pressEnter}
				       autoFocus={true}
				/>
				<span>counter</span>
				<Button name={'Save'} callback={saveAndInactivateModal}/>
			</div>
		</div>
	);
});