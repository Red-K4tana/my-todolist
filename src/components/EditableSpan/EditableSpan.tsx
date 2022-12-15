import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import sl from './EditableSpan.module.css';

type EditableSpanPropsType = {
    title: string
    callback: (newTitle:string) => void
}


export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)

    const [title, setTitle] = useState(props.title)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onBlurInput = () => {
        /*if (title.length > 0) {

        } else {
            console.log('empty task title')
        }*/
        props.callback(title)
        setEditMode(false)
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

