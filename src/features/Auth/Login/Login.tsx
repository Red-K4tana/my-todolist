import {ChangeEvent, useState} from 'react';
import sl from './Login.module.css';
import btnSl from 'common/components/Button/Button.module.css'
import {Input} from 'common/components/Input/Input';
import {Button} from 'common/components';
import {AppRootState} from 'app/store';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useAppDispatch} from 'common/hooks';
import {authThunks} from "../authReducer";
import {AuthRequestData} from "../authApi";


export const Login = () => {
	const dispatch = useAppDispatch()
	const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
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

	const loginHandler = () => {
		if (emailValue.length === 0 || passwordValue.length === 0) {
			setBlinkButton(true)
			setTimeout(() => setBlinkButton(false), 600) //disable blinkButtonClass after triggering
			return // stop if empty some field
		} else {
			if (errorValidateEmail || errorValidatePassword) {
				setBlinkButton(true)
				setTimeout(() => setBlinkButton(false), 600) //disable blinkButtonClass after triggering
				return // stop if not valid some field
			} else {
				const loginValue: AuthRequestData = {
					email: emailValue,
					password: passwordValue,
					rememberMe: rememberMeValue,
				}
				dispatch(authThunks.authLogIn(loginValue))
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
					       callbackDispatchValue={loginHandler}
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
					       callbackDispatchValue={loginHandler}
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
						       onChange={(e: ChangeEvent<HTMLInputElement>) => {
							       setRememberMeValue(e.currentTarget.checked)
						       }}/>
					</label>
					Remember me
				</label>
				<Button name={'Login'}
				        callback={loginHandler}
				        style={`${btnSl.button} ${blinkButton && sl.blinkButtonClass}  `}
				/>
			</div>


		</div>
	);
};