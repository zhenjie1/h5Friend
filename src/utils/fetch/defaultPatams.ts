import store from '@/store'
import { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { isEqual } from 'lodash'
import { isFormData } from '../tool'
import ajaxUrl from './url'

// 将 T 中的 U 改为必填
type FetchRequired<
	T extends object,
	U extends keyof T,
	I = Required<Pick<T, U>>,
	O = Omit<T, U>
> = I & O

/**
 * 默认参数处理
 *
 * @param {Fetch.all} options fetch 传入的参数
 * @returns {FetchRequired<Fetch.all, keyof Fetch.config>} 返回 axios 可用参数
 */
export default function defaultParams(
	options: Fetch.all
): FetchRequired<Fetch.all, keyof Fetch.config> {
	const {
		url,
		method = 'POST',
		timeout = 1 * 60 * 1000,
		headers = {},
		data = {},
		file = false,
		token = true,
		isCode = true,
		exclude = [undefined, ''],
		codeErrorMessage = true,
	} = options
	const headersConfig: Data = headers

	// get 处理
	// if (method === 'get' && isObject(data)) options.params = data

	options.url = ajaxUrl('ajax') + url
	console.log(options.url)
	if (method.toLowerCase() === 'get' && Object.keys(data).length > 0) {
		options.url += `?${qs.stringify(data)}`
	}
	options.data = data || {}
	options.method = method
	options.token = token
	options.file = file
	options.isCode = isCode
	options.codeErrorMessage = codeErrorMessage
	options.headers = headers
	options.timeout = timeout

	// 参数过滤
	excludeData(data, exclude)

	// 上传文件时, 修改 Content-Typ 值
	if (file) {
		headersConfig['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
	}
	headersConfig.token = store.state.user.userInfo.token

	// 将 Fetch.config 设置为必填(已有值的状态)
	const op = options as FetchRequired<Fetch.all, keyof Fetch.config>

	options.headers = headersConfig
	return op
}

// 排除参数处理
function excludeData(data: AxiosRequestConfig['data'], exclude: Fetch.config['exclude']) {
	// FormData 类型无法过滤
	if (isFormData(data)) return
	if (!exclude) return

	const defaultExclude = [undefined, '']

	// 将 exclude 统一格式为 Record<string, any[]>
	const newExclude: Record<string, any[]> = {}
	if (Array.isArray(exclude)) for (const i in data) newExclude[i] = exclude
	else {
		// 默认值处理
		for (const i in data) newExclude[i] = defaultExclude
		// 自定义配置覆盖
		for (const i in exclude) newExclude[i] = exclude[i]
	}

	const keys = Object.keys(newExclude)
	keys.map((k) => {
		newExclude[k].map((v) => {
			if (isEqual(v, data[k])) delete data[k]
		})
	})
}
