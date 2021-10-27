import APIFetch from 'utils/fetch'

// 获取图形码
export const getToken = () =>
	APIFetch(
		{
			url: '/api/user/get_token',
		},
		'data.data.userinfo'
	)
