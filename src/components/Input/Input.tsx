import React, {ChangeEvent, KeyboardEvent} from 'react';
import sl from '.././Todolist/Todolist.module.css'
type InputPropsType = {
    value: string
    callbackActive: ()=> void
    callbackForOnChange: (e: ChangeEvent<HTMLInputElement>)=> void
    style: string
    placeholder: string
}


export const Input = (props: InputPropsType) => {
    const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.callbackActive()
        }
    }

    return (
            <input className={sl[props.style]}
                   type='text'
                   value={props.value}
                   onChange={(e)=>props.callbackForOnChange(e)}
                   onKeyPress={pressEnter}
                   placeholder={props.placeholder}
            />
    );
};
