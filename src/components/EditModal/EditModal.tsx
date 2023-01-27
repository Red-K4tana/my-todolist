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

	const [title, setTitle] = useState(props.title)
	const changeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setTitle(e.currentTarget.value)
	}
	//====================================================================================================================
	const saveAndInactivateModal = () => {
		console.log('DISPATCH TITLE ')
		props.callbackToDispatchTitle(title)
		onBlurCloseModal()
	}
	const pressEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			saveAndInactivateModal()
		}
	}
	//====================================================================================================================
	const onBlurCloseModal = () => {
		console.log('onBlur')
		setTitle(props.title)
		props.callbackToViewMode(false)
	}
	//====================================================================================================================

	return (
		<div className={props.viewModeStyle ? `${sl.modal} ${sl.active}` : sl.modal} onClick={onBlurCloseModal}>
			<div className={sl.modal__content} onClick={(e)=>{e.stopPropagation()}}>
				<textarea value={title}
				          onChange={changeTitle}
				          onKeyPress={pressEnter}
				          autoFocus={true}>
				</textarea>
				<div className={sl.interactionTools}>
					<Button name={'Save'} style={sl.saveModalButton} callback={saveAndInactivateModal}/>
					<span>{title.length}/100</span>
				</div>
			</div>
		</div>
	);
});