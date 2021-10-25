import { tokenKey } from '@/assets/js/keys'
import { clearUserCache } from '@/assets/js/user'
import router from '@/router'
import APIFetch from '@/utils/fetch'
import { get } from 'js-cookie'

// 根据 refreshToken 换取 新的 accessToken
export const getNewToken = (): Promise<any> => {
	const refreshToken = get(tokenKey.refresh)
	if (!refreshToken) {
		clearUserCache()
		router.push('/login')
		throw new Error('没有 refreshToken, 换取 accessToken 失败!')
	}

	return APIFetch({
		url: '/product.token.get',
		method: 'get',
		storePath: false,
		token: false,
		tokenCarry: false,
		refreshToken: true,
		headers: {
			refreshToken,
		},
	})
}
