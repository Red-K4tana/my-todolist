import {ChangeEvent, FC, KeyboardEvent, memo, useEffect, useState} from 'react';
import sl from 'common/components/EditModal/EditModal.module.css';
import {Button} from 'common/components';


type EditModalProps = {
	viewModeStyle: boolean
	title: string
	callbackToDispatchTitle: (newTitle: string) => void
	callbackToViewMode: (viewMode: boolean) => void
}

export const EditModal: FC<EditModalProps> = memo(({
	                          viewModeStyle,
	                          title,
	                          callbackToDispatchTitle,
	                          callbackToViewMode,
                          }) => {
	const [valueTitle, setValueTitle] = useState(title)
	const changeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setValueTitle(e.currentTarget.value)
	}
	//====================================================================================================================
	const saveAndInactivateModal = () => {
		callbackToDispatchTitle(valueTitle)
		onBlurCloseModal()
	}
	const pressEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			saveAndInactivateModal()
		}
	}
	//====================================================================================================================
	const onBlurCloseModal = () => {
		setValueTitle(title)
		callbackToViewMode(false)
	}
	//====================================================================================================================
	useEffect(()=>{
		let textarea: any = document.querySelector('textarea')
		textarea.selectionStart = textarea.value.length
	},[])
	return (
		<div className={viewModeStyle ? `${sl.modal} ${sl.active}` : sl.modal} onClick={onBlurCloseModal}>
			<div className={sl.modal__content} onClick={(e)=>{e.stopPropagation()}}>
				<textarea id={'textarea'}
				          value={valueTitle}
				          onChange={changeTitle}
				          onKeyPress={pressEnter}
				          autoFocus={true}>
				</textarea>
				<div className={sl.interactionTools}>
					<Button name={'Save'} style={sl.saveModalButton} callback={saveAndInactivateModal}/>
					<span>{valueTitle.length}/100</span>
				</div>
			</div>
		</div>
	);
});