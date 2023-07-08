import {AxiosResponse} from 'axios'
import {instance} from 'common/commonApi'
import {ResponseServerType} from 'common/types'

export const authAPI = {
	authLogin(loginData: AuthDataType) {
		return instance.post<{loginData: AuthDataType}, AxiosResponse<ResponseServerType>>('auth/login', loginData)
	},
	authMe() {
		return instance.get<ResponseServerType>('auth/me')
	},
	authLogout() {
		return instance.delete<ResponseServerType>('auth/login')
	},
}

export type AuthDataType = {
	email: string
	password: string
	rememberMe?: boolean
	captcha?: boolean
}
