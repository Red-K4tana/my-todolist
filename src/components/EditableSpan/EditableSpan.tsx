import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
    const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.callback(title)
        }
    }

    return (
        editMode
            ?
            <input onChange={changeTitle}
                   onBlur={()=>props.callback(title)}
                   onKeyPress={pressEnter}>
                {title}
            </input>
            :
            <span onDoubleClick={()=>setEditMode(true)}>
                {props.title}
            </span>
    );
};

