import {AxiosResponse} from 'axios'
import {instance} from 'common/commonApi/commonApi'
import {ResponseType} from 'common/types/commonTypes'

export const authAPI = {
	authLogin(loginData: AuthDataType) {
		return instance.post<{loginData: AuthDataType}, AxiosResponse<ResponseType>>('auth/login', loginData)
	},
	authMe() {
		return instance.get<ResponseType>('auth/me')
	},
	authLogout() {
		return instance.delete<ResponseType>('auth/login')
	},
}

export type AuthDataType = {
	email: string
	password: string
	rememberMe?: boolean
	captcha?: boolean
}
