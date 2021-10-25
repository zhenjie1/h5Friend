import { stringify } from 'qs'
type A = Exclude

export default function ajaxUrl(type: 'ws' | 'ajax' = 'ajax'): string {
	const { host, protocol } = location
	const onlineUrl = `${protocol}//${host}`

	const urlKey = getQueryString('url')

	const urls: { [key: string]: [string, string] | undefined } = {
		gt: ['http://192.168.3.3:9811', '192.168.3.3'],
		ysx: ['https://local.taishana.com', 'local.taishana.com'],
	}

	if (urlKey) {
		const index: 0 | 1 = type === 'ajax' ? 0 : 1
		return urls[urlKey]![index]
	}

	return onlineUrl
}

/**
 * 根据 axios 请求参数, 获取接口唯一 key
 * [url + data + params]
 * @param {Fetch.all} config 配置
 * @returns {string} 返回 key
 */
export function fetchGetKey(config: Fetch.all): string {
	const { data = {}, params = {} } = config
	const newData = stringify(Object.assign(data, params))
	const key = config.url + '?' + newData
	return key
}

/**
 * 获取地址栏的参数
 *
 * @param {string} key 参数名
 * @returns {string|undefined} 返回 null 或 获取的参数
 */
export function getQueryString(key: string): string {
	let search = location.search

	if (search) search = search.replace('?', '')

	const param = search.match(new RegExp(`${key}=([^&]*)`))

	if (param) return param[1]

	return ''
}
