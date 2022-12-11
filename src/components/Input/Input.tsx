import React, {ChangeEvent, KeyboardEvent} from 'react';
import sl from './Input.module.css'
type InputPropsType = {
    value: string
    callbackActive: ()=> void
    callbackForOnChange: (e: ChangeEvent<HTMLInputElement>)=> void
    style: string
    placeholder: string
    label?: string
}


export const Input = (props: InputPropsType) => {
    const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.callbackActive()
        }
    }

    return (
        <>{props.label &&
            <label>
                {props.label}
            </label>
        }
            <input className={`${sl.baseInputStyle} ${sl[props.style]}`}
                   type='text'
                   value={props.value}
                   onChange={(e)=>props.callbackForOnChange(e)}
                   onKeyPress={pressEnter}
                   placeholder={props.placeholder}
            />
        </>

    );
};
