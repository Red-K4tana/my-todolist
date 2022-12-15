import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import sl from './Login.module.css';
import btnSl from '../Button/Button.module.css'
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
            setBlinkButton(false) //disable blinkButtonClass
        }
    }
    //================================================ PASSWORD ========================================================
    const [passwordValue, setPasswordValue] = useState<string>('')
    const changePasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.currentTarget.value)
        setErrorValidatePassword(false)
        setBlinkButton(false) //disable blinkButtonClass
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
    const [blinkButton, setBlinkButton] = useState<boolean>(false) //activator blinkButtonClass

    const login = () => {
        if (emailValue.length === 0 || passwordValue.length === 0) {
            setBlinkButton(true)
            setTimeout(()=> setBlinkButton(false), 600) //disable blinkButtonClass after triggering
            return
        } else {
            if (errorValidateEmail || errorValidatePassword) {
                setBlinkButton(true)
                setTimeout(()=> setBlinkButton(false), 600) //disable blinkButtonClass after triggering
                return
            } else {
                console.log('dispatch')
            }
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
                <label>
                    Remember me
                    <input type={'checkbox'} value={rememberMeValue ? 'true' : 'false'}/>
                </label>
                <Button name={'LOGIN'}
                        callback={login}
                        style={`${sl.loginButton} ${blinkButton && sl.blinkButtonClass}  `}
                />
            </div>


        </div>
    );
};

