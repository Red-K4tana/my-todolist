import React from 'react';
import sl from '../Todolist/Todolist.module.css';

type ButtonPropsType = {
    name: string
    callback: () => void
    style: string

}

export const Button = (props: ButtonPropsType) => {

    return (
        <button onClick={()=>props.callback()} className={sl[props.style]}>{props.name}</button>
    );
}
