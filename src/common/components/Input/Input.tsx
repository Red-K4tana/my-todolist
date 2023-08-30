import {ChangeEvent, FC, KeyboardEvent} from 'react';
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


export const Input: FC<InputProps> = ({
                                          value,
                                          callbackDispatchValue,
                                          callbackForOnChange,
                                          situationalStyle,
                                          placeholder,
                                          labelText,
                                          type,
                                          onBlur,
}) => {
    const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {callbackDispatchValue()}
    }

    return (
        <>{labelText &&
            <label>
                {labelText}
            </label>
        }
            <input className={`${sl.baseInputStyle} ${sl[situationalStyle]}`}
                   type={type ? type : 'text'}
                   value={value}
                   onChange={(e) => callbackForOnChange(e)}
                   onKeyPress={pressEnter}
                   placeholder={placeholder}
                   onBlur={onBlur}
            />
        </>

    );
};
