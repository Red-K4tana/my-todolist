import {AxiosResponse} from 'axios'
import {instance} from 'common/commonApi'
import {ResponseServerType} from 'common/types'

export const authAPI = {
	authLogIn(loginData: AuthRequestDataType) {
		return instance.post<{loginData: AuthRequestDataType}, AxiosResponse<ResponseServerType>>('auth/login', loginData)
	},
	authMe() {
		return instance.get<ResponseServerType>('auth/me')
	},
	authLogOut() {
		return instance.delete<ResponseServerType>('auth/login')
	},
}

export type AuthRequestDataType = {
	email: string
	password: string
	rememberMe: boolean
	captcha?: boolean
}
