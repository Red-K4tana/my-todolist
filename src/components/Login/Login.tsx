import React from 'react';
import sl from './Login.module.css';
import {Input} from "../Input/Input";


export const Login = () => {
    return (
        <div className={sl.loginContainer}>
            <div className={sl.instructionLogin}>
                <p>To log in get registered <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>here</a></p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: more than 2 characters</p>
            </div>
            <div className={sl.formAuthorization}>

            </div>


        </div>
    );
};

