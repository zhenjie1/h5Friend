import APIFetch from 'utils/fetch'

// 待审核列表
export const getToBeReviewed = (data: Data) =>
	APIFetch(
		{
			url: '/api/scrip/wait_check_list',
			data,
		},
		'data.data'
	)

// 审核 -- 列表
export const audit = (id: number, decision: 1 | 2, remark = '') =>
	APIFetch(
		{
			url: '/api/scrip/check',
			data: {
				id,
				decision,
				remark,
			},
		},
		'data'
	)
