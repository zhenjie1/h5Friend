import { tokenKey } from '@/assets/js/keys'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ajaxGetNewToken } from './after'
import { fetchGetKey } from './url'

/**
 *  api 接口存储
 * 	key: url + data
 *  value: 接口返回的数据
 */
export const apiSave: Data = {}

axios.interceptors.request.use((config) => {
	const configs = config as Fetch.all

	if (configs.token) {
		const token = Cookies.get(tokenKey.access)
		if (!token) return ajaxGetNewToken(config)
	}

	// 读取 apiSave, 先显示缓存数据
	if (typeof configs.cacheCb === 'function') {
		const key = fetchGetKey(configs)

		if (apiSave[key]) configs.cacheCb(apiSave[key])
	}

	return config
})
