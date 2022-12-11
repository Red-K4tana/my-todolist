import React, {ChangeEvent, useState} from 'react';
import sl from './Login.module.css';
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";


export const Login = () => {
    //================================================= EMAIL ==========================================================
    const [emailValue, setEmailValue] = useState<string>('')
    const changeEmailValue = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.currentTarget.value)
    }
    //================================================ PASSWORD ========================================================
    const [passwordValue, setPasswordValue] = useState<string>('')
    const changePasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.currentTarget.value)
    }

    //================================================ REMEMBER ME =====================================================
    const [rememberMeValue, setRememberMeValue] = useState<string>('false')

    //==================================================================================================================
    const login = () => {

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
                           callbackActive={login}
                           situationalStyle={''}
                           labelText={'Email'}
                    />
                </div>
                <div className={sl.inputPassword}>
                    <Input value={passwordValue}
                           callbackForOnChange={changePasswordValue}
                           callbackActive={login}
                           situationalStyle={''}
                           labelText={'Password'}
                           type={'password'}
                    />
                </div>
                <input type={'checkbox'} value={rememberMeValue}/>
                <Button name={'LOGIN'} callback={login} style={'button'}/>
            </div>


        </div>
    );
};

