import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {Button} from "../Button/Button";
import sl from '../Todolist/Todolist.module.css'
import {Input} from "../Input/Input";


type AddItemFormPropsType = {
    textButton: string
    addItem: (title: string) => void
    placeholder: string
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

    return (
        <>
            <div className={sl.addItemForm_Input_and_Button}>
                <Input value={title}
                       callbackForOnChange={changeTitle}
                       callbackDispatchValue={addItem}
                       situationalStyle={error ? 'placeholderColor' : ''}
                       placeholder={error ? 'Empty field' : props.placeholder}
                />
                <Button name={props.textButton} callback={addItem} style={'button'}/>
            </div>
            {/*{error && errorMessage}*/}
        </>
    );
};

