import {AxiosResponse} from 'axios'
import {instance} from 'common/commonApi'
import {ResponseServer} from 'common/types'

export const authAPI = {
	authLogIn(loginData: AuthRequestData) {
		return instance.post<{loginData: AuthRequestData}, AxiosResponse<ResponseServer>>('auth/login', loginData)
	},
	authMe() {
		return instance.get<ResponseServer>('auth/me')
	},
	authLogOut() {
		return instance.delete<ResponseServer>('auth/login')
	},
}

export type AuthRequestData = {
	email: string
	password: string
	rememberMe: boolean
	captcha?: boolean
}
