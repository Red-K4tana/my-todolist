import React from 'react';
import sl from './Button.module.css';

type ButtonPropsType = {
    name: string
    callback: () => void
    style: string
    disabled?: boolean
}

export const Button = (props: ButtonPropsType) => {

    return (
        <button className={sl[props.style]}
                onClick={()=>props.callback()}
                disabled={props.disabled}
        >
            {props.name}
        </button>
    );
}
