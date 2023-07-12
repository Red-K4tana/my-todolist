import {ChangeEvent, KeyboardEvent, useState} from 'react';
import sl from 'common/components/EditableSpan/EditableSpan.module.css';
import {useAppDispatch} from 'app/store';
import {appActions} from 'app/appReducer';

type EditableSpanPropsType = {
    title: string
    callback: (newTitle:string) => void
}


export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    // =================================================================================================================
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState(props.title)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const activateViewMode = () => {
        if (title.length > 30) {
            dispatch(appActions.setAppError({error: 'Title`s length should be less than 27 chars.'}))
        } else if (title.length <= 0) {
            dispatch(appActions.setAppError({error: 'Title should not be empty.'}))
        } else {
            dispatch(appActions.setAppError({error: null}))
            props.callback(title)
            setEditMode(false)
        }
    }
    const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activateViewMode()
        }
    }

    return (
        editMode
            ?
            <input className={sl.inputEdit}
                   value={title}
                   onChange={changeTitle}
                   onBlur={activateViewMode}
                   onKeyPress={pressEnter}
                   autoFocus={true}
            />
            :
            <span onDoubleClick={()=>setEditMode(true)}>
                {props.title}
            </span>
    );
};