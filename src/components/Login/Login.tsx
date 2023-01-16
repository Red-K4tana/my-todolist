import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import sl from './Login.module.css';
import btnSl from '../Button/Button.module.css'
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";
import {AppRootStateType, useAppDispatch} from "../../redux/store";
import {authLoginTC} from "../../redux/authReducer";
import {AuthDataType} from "../../API/todolistAPI";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";


export const Login = React.memo( () => {
    /*console.log('RENDER Login')*/

    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    //================================================= EMAIL ==========================================================
    const [emailValue, setEmailValue] = useState<string>('rdm911@list.ru')
    const changeEmailValue = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.currentTarget.value)
        setErrorValidateEmail(false)
    }
    const [errorValidateEmail, setErrorValidateEmail] = useState<boolean>(false)
    const validateEmail = () => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue)) {
            setErrorValidateEmail(true)
            setBlinkButton(false) //disable blinkButtonClass
        }
    }
    //================================================ PASSWORD ========================================================
    const [passwordValue, setPasswordValue] = useState<string>('1234')
    const changePasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.currentTarget.value)
        setErrorValidatePassword(false)
        setBlinkButton(false) //disable blinkButtonClass
    }
    const [errorValidatePassword, setErrorValidatePassword] = useState<boolean>(false)
    const validatePassword = () => {
        if (passwordValue.length < 2) {
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
            return // stop if empty some field
        } else {
            if (errorValidateEmail || errorValidatePassword) {
                setBlinkButton(true)
                setTimeout(()=> setBlinkButton(false), 600) //disable blinkButtonClass after triggering
                return // stop if not valid some field
            } else {
                const loginValue: AuthDataType = {
                    email: emailValue,
                    password: passwordValue,
                    rememberMe:rememberMeValue,
                }
                dispatch(authLoginTC(loginValue))
            }
        }
    }
    //==================================================================================================================

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={sl.loginContainer}>
            <div className={sl.instructionLogin}>
                <p>To log in get registered <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                    here
                </a> or use common test account credentials:</p>
                <p>Email: <i>rdm911@list.ru</i></p>
                <p>Password: <i>1234</i></p>
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
                    <span className={errorValidateEmail ? sl.spanErrorVisible : sl.spanErrorCollapse}>
                        Uncorrected email
                    </span>
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
                    <span className={errorValidatePassword ? sl.spanErrorVisible : sl.spanErrorCollapse}>
                        Uncorrected password
                    </span>
                </div>
                <label className={sl.rememberMeClass}>
                    <label className={rememberMeValue ? sl.labelRememberMeChecked : sl.labelRememberMeUnchecked}>
                        <input className={sl.inputRememberMe}
                               type={'checkbox'}
                               checked={rememberMeValue}
                               onChange={(e:ChangeEvent<HTMLInputElement>)=>{setRememberMeValue(e.currentTarget.checked)}}/>
                    </label>
                    Remember me
                </label>
                <Button name={'Login'}
                        callback={login}
                        style={`${btnSl.button} ${blinkButton && sl.blinkButtonClass}  `}
                />
            </div>


        </div>
    );
});