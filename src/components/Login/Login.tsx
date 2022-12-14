import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import sl from './Login.module.css';
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";


export const Login = () => {
    //================================================= EMAIL ==========================================================
    const [emailValue, setEmailValue] = useState<string>('')
    const changeEmailValue = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.currentTarget.value)
        setErrorValidateEmail(false)
    }
    const [errorValidateEmail, setErrorValidateEmail] = useState<boolean>(false)
    const validateEmail = () => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue)) {
            console.log('email not ok')
            setErrorValidateEmail(true)
        }
    }
    //================================================ PASSWORD ========================================================
    const [passwordValue, setPasswordValue] = useState<string>('')
    const changePasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.currentTarget.value)
        setErrorValidatePassword(false)
    }
    const [errorValidatePassword, setErrorValidatePassword] = useState<boolean>(false)
    const validatePassword = () => {
        if (passwordValue.length < 2) {
            console.log('pass not ok')
            setErrorValidatePassword(true)
        }
    }
    //================================================ REMEMBER ME =====================================================
    const [rememberMeValue, setRememberMeValue] = useState<boolean>(false)

    //==================================================================================================================
    const refButton = useRef<boolean>(false) // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const login = () => {
        if (errorValidateEmail || errorValidatePassword) {
            return
        } else {
            console.log('dispatch')
        }
    }

    return (
        <div className={sl.loginContainer}>
            <div className={sl.instructionLogin}>
                <p>To log in get registered <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>here</a></p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: more than 2 characters</p>
            </div>
            <div className={sl.formAuthorization}>
                <div className={sl.inputEmail}>
                    <Input value={emailValue}
                           callbackForOnChange={changeEmailValue}
                           callbackDispatchValue={login}
                           situationalStyle={''}
                           labelText={'Email'}
                           onBlur={validateEmail}
                    />
                    {errorValidateEmail && <span style={{color: '#fe5212'}}>Uncorrected email</span>}
                </div>
                <div className={sl.inputPassword}>
                    <Input value={passwordValue}
                           callbackForOnChange={changePasswordValue}
                           callbackDispatchValue={login}
                           situationalStyle={''}
                           labelText={'Password'}
                           type={'password'}
                           onBlur={validatePassword}
                    />
                    {errorValidatePassword && <span style={{color: '#fe5212'}}>Uncorrected password</span>}
                </div>
                <input type={'checkbox'} value={rememberMeValue ? 'true' : 'false'}/>
                <Button name={'LOGIN'}
                        callback={login}
                        style={'button'}
                        disabled={errorValidateEmail || errorValidatePassword && false}/>
            </div>


        </div>
    );
};

