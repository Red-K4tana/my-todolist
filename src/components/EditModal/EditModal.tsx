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
	console.log('RENDER EditModal')

	const dispatch = useAppDispatch()

	const [title, setTitle] = useState(props.title)
	const changeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setTitle(e.currentTarget.value)
	}
	console.log('title ', title)
	//====================================================================================================================
	const saveAndInactivateModal = () => {
		console.log('dispatch title ', title)
		props.callbackToDispatchTitle(title)
		props.callbackToViewMode(false)
	}
	const pressEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			props.callbackToDispatchTitle(title)
			props.callbackToViewMode(false)
		}
	}
	return (
		<div className={props.viewModeStyle ? `${sl.modal} ${sl.active}` : sl.modal}>
			<div className={sl.modal__content}>
				{/*<input value={title}
				       onChange={changeTitle}
				       onBlur={() => props.callbackToViewMode(false)}
				       onKeyPress={pressEnter}
				       autoFocus={true}
				/>*/}
				<textarea value={title}
				          onChange={changeTitle}
				          /*onBlur={() => props.callbackToViewMode(false)}*/
				          onKeyPress={pressEnter}
				          autoFocus={true}>
				</textarea>
				<div className={sl.interactionTools}>
					<Button name={'Save'} callback={saveAndInactivateModal}/>
					<span>{title.length}/100</span>
				</div>
			</div>
		</div>
	);
});