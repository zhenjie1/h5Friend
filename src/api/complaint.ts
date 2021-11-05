import APIFetch from 'utils/fetch'

// 获取图形码
export const complaint = (content: string) =>
	APIFetch(
		{
			url: '/api/complain/add',
			data: { content },
		},
		'data.data'
	)
