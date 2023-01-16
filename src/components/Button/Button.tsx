import React from 'react';
import sl from './Button.module.css';

type ButtonPropsType = {
    name: string
    callback: () => void
    style?: string
    disabled?: boolean
    classNameSpanButton?: string
}

export const Button = React.memo( (props: ButtonPropsType) => {
    /*console.log('RENDER Button')*/

    return (
        <label className={props.classNameSpanButton}>
            <button className={`${props.style} `}
                    onClick={()=>props.callback()}
            >
                {props.name}
            </button>
            <span></span>
        </label>
    );
});
