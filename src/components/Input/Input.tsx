import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    value: string
    callbackActive: ()=> void
    callbackForOnChange: (e: ChangeEvent<HTMLInputElement>)=> void
    style?: string
}


export const Input = (props: InputPropsType) => {
    const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.callbackActive()
        }
    }

    return (
        <>
            <input type='text'
                   value={props.value}
                   onChange={(e)=>props.callbackForOnChange(e)}
                   onKeyPress={pressEnter}/>
        </>
    );
};
