import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import sl from './EditableSpan.module.css';
import {useAppDispatch} from "../../redux/store";
import {setAppErrorAC, setAppStatusAC} from "../../redux/appReducer";

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
    const onBlurInput = () => {
        if (title.length > 20) {
            dispatch(setAppErrorAC('Title`s length should be less than 20 characters'))
        } else {
            dispatch(setAppErrorAC(null))
            props.callback(title)
            setEditMode(false)
        }
    }
    const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onBlurInput()
        }
    }
    return (
        editMode
            ?
            <input className={sl.inputEdit}
                   value={title}
                   onChange={changeTitle}
                   onBlur={onBlurInput}
                   onKeyPress={pressEnter}
                   autoFocus={true}
            />
            :
            <span onDoubleClick={()=>setEditMode(true)}>
                {props.title}
            </span>
    );
};

