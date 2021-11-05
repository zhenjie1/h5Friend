import axios, { AxiosResponse } from 'axios'
import defaultParams from './defaultPatams'
// import './before'
import './after'
import { GetFieldType } from 'typings/utils'
import { getObjValue } from '..'
import { Toast } from 'vant'
import store from '@/store'
import { wxAuthStart } from '@/assets/js/authMixin'

/**
 * 发送请求
 *
 * @param {Fetch.all} params 参数
 * @returns {Observer} 返回数据
 */
export default function APIFetch<
	T,
	TPath extends string,
	TResult = GetFieldType<AxiosResponse<T>, TPath, any>
>(params: Fetch.all, path: TPath): Promise<TResult> {
	const config = defaultParams(params)

	const { isCode } = config

	const app = axios(config)
		.then((response) => {
			if (!response) return
			const data = response.data

			if (typeof data !== 'object') return data

			if (data.code === 1) {
				const result = getObjValue(response, path)
				return result
			} else if (isCode) {
				if (data.msg) Toast(data.msg)
				throw data
			}
			return getObjValue(response, path)
		})
		.catch((err) => {
			const { data, status } = err.response

			if (status === 401) loginAuth()
			console.log('error', status, data)
			throw err
		})
	return app
}

// 401 错误时, 重新授权
function loginAuth() {
	store.commit('user/userinfo', {} as any)
	wxAuthStart()
}
