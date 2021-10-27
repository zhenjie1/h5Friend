import APIFetch from 'utils/fetch'

// 获取图形码
export const uploadImage = (data: FormData) =>
	APIFetch(
		{
			url: '/api/common/upload',
			data,
			file: true,
		},
		'data'
	)
