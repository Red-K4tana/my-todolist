import {AxiosResponse} from 'axios';
import {AuthDataType, ResponseType} from 'common/commonApi/commonApi';

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