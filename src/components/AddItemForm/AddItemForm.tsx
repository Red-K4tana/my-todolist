import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {Button} from "../Button/Button";



type AddItemFormPropsType = {
    textButton: string
    addItem: (title: string) => void
}


export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const addItem = () => {
        props.addItem(title)
        setTitle('')

    }

    const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }


    return (
        <>
            <input type="text" value={title} onChange={changeTitle} onKeyPress={pressEnter}/>
            <button onClick={addItem}>{props.textButton}</button>
        </>
    );
};

