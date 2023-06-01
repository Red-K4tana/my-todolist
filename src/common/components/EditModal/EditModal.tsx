import {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import sl from 'common/components/EditModal/EditModal.module.css';
import {Button} from 'common/components/Button/Button';


type EditModalPropsType = {
	viewModeStyle: boolean
	title: string
	callbackToDispatchTitle: (newTitle: string) => void
	callbackToViewMode: (viewMode: boolean) => void
}

export const EditModal = (props: EditModalPropsType) => {
	const [title, setTitle] = useState(props.title)
	const changeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setTitle(e.currentTarget.value)
	}
	//====================================================================================================================
	const saveAndInactivateModal = () => {
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
		setTitle(props.title)
		props.callbackToViewMode(false)
	}
	//====================================================================================================================
	useEffect(()=>{
		let textarea: any = document.querySelector('textarea')
		textarea.selectionStart = textarea.value.length
	},[])
	return (
		<div className={props.viewModeStyle ? `${sl.modal} ${sl.active}` : sl.modal} onClick={onBlurCloseModal}>
			<div className={sl.modal__content} onClick={(e)=>{e.stopPropagation()}}>
				<textarea id={'textarea'}
				          value={title}
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
};