import axios from 'axios'

axios.interceptors.response.use((config) => {
	if (typeof config.data !== 'object') return config

	// 如果无需验证token, 接口异常时不检查, 避免死循环请求
	const configs = config as any // as Fetch.all

	return configs
})
