import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {Button} from "../Button/Button";
import sl from '../Todolist/Todolist.module.css'


type AddItemFormPropsType = {
    textButton: string
    addItem: (title: string) => void
}


export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)



    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)

    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle.length > 0) {
            props.addItem(trimmedTitle)
            setTitle('')

        } else {
            setError(true)
        }

    }

    const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    const errorMessage = <div style={{color: 'red'}}>Empty field</div>

    return (
        <div>
            <input type="text" value={title} onChange={changeTitle} onKeyPress={pressEnter}/>
            <Button name={props.textButton} callback={addItem} style={'button'}/>
            {error && errorMessage}
        </div>
    );
};

