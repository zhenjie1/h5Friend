import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import router from '@/router'
import { clearUserCache } from '@/assets/js/user'
import { api } from '@/api'
import store from '@/store'

axios.interceptors.response.use((config) => {
	if (typeof config.data !== 'object') return config

	// 如果无需验证token, 接口异常时不检查, 避免死循环请求
	const configs = config as any // as Fetch.all

	if (configs.config.token === false) return config

	return codeErrorDeal(config)
})

// code 异常时做的处理
function codeErrorDeal(config: AxiosResponse<any>) {
	const code = config.data.code

	if ([900018, 900010, 900101].includes(code)) {
		router.push('/login')
		clearUserCache()
	} else if (code === 900019) {
		return ajaxGetNewToken(config.config).then(axios)
	}

	return config
}

interface FetchState {
	resolve: (value: unknown) => void
	reject: (value: unknown) => void
	config: AxiosRequestConfig
}

let fetchState: FetchState[] = []

// accessToken 失效时, 换取新的 token
export function ajaxGetNewToken(config: AxiosRequestConfig): Promise<any> {
	const p = new Promise((resolve, reject) => {
		fetchState.push({
			resolve,
			reject,
			config,
		})
	})

	if (fetchState.length !== 1) return p

	// 请求获取新的 token
	api.user
		.getNewToken()
		.then((data) => {
			const { data: newToken, code } = data
			if (code !== 100000) throw new Error('换取 token 异常')

			console.warn('换取新 accessToken 成功', newToken)
			store.commit('user/changeAccessToken', newToken)

			fetchState.map(({ config, resolve }) => {
				config.headers.accessToken = newToken
				resolve(config)
			})

			fetchState = []
		})
		.catch((err) => {
			fetchState.map(({ config, reject }) => reject(config))

			console.error('换取新的 token 时报错', err)
			router.push('/login')
			clearUserCache()
		})

	return p
}
