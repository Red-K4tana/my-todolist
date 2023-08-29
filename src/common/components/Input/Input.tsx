import {ChangeEvent, KeyboardEvent} from 'react';
import sl from 'common/components/Input/Input.module.css'
type InputProps = {
    value: string
    callbackDispatchValue: ()=> void
    callbackForOnChange: (e: ChangeEvent<HTMLInputElement>)=> void
    situationalStyle: string
    placeholder?: string
    labelText?: string
    type?: string
    onBlur?: ()=> void
}


export const Input = (props: InputProps) => {
    const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.callbackDispatchValue()
        }
    }

    return (
        <>{props.labelText &&
            <label>
                {props.labelText}
            </label>
        }
            <input className={`${sl.baseInputStyle} ${sl[props.situationalStyle]}`}
                   type={props.type ? props.type : 'text'}
                   value={props.value}
                   onChange={(e)=>props.callbackForOnChange(e)}
                   onKeyPress={pressEnter}
                   placeholder={props.placeholder}
                   onBlur={props.onBlur}
            />
        </>

    );
};
