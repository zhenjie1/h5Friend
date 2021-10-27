import APIFetch from 'utils/fetch'

// 待审核列表
export const getToBeReviewed = () =>
	APIFetch(
		{
			url: '/api/scrip/wait_check_list',
		},
		'data.data'
	)
