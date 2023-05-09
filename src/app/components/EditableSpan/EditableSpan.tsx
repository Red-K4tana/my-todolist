import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import sl from 'app/components/EditableSpan/EditableSpan.module.css';
import {useAppDispatch} from 'app/redux/store';
import {setAppErrorAC} from 'app/redux/appReducer';

type EditableSpanPropsType = {
    title: string
    callback: (newTitle:string) => void
}


export const EditableSpan = React.memo( (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    // =================================================================================================================
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState(props.title)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const activateViewMode = () => {
        if (title.length > 30) {
            dispatch(setAppErrorAC('Title`s length should be less than 27 chars.'))
        } else if (title.length <= 0) {
            dispatch(setAppErrorAC('Title should not be empty.'))
        } else {
            dispatch(setAppErrorAC(null))
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
});