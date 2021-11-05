import APIFetch from 'utils/fetch'

// 微信授权 - 获取code
export const getWxCode = () =>
	APIFetch(
		{
			url: '/api/user/get_code',
			method: 'get',
		},
		'data'
	)

// 获取 token
export const getToken = () =>
	APIFetch(
		{
			url: '/api/user/get_token',
		},
		'data.data.userinfo'
	)

// 登录
export const login = (code: string) =>
	APIFetch(
		{
			url: '/api/user/login',
			method: 'get',
			data: { code },
		},
		'data.data'
	)
