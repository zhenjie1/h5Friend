import APIFetch from 'utils/fetch'
import store from '@/store/index'

// 获取爱好
export const getHobby = () =>
	APIFetch(
		{
			url: '/api/hobby/list',
		},
		'data.data'
	)

// 获取城市code
export const getCityCode = (city: string) =>
	APIFetch(
		{
			url: '/api/china/list',
			method: 'get',
			data: {
				keyword: city,
			},
		},
		'data.data'
	)

// 获取学校
export const getSchool = (data: Data, page = 1, keyword?: string) =>
	APIFetch(
		{
			url: '/api/school/list',
			method: 'get',
			data: {
				...data,
				page,
				limit: 30,
				keyword,
			},
		},
		'data.data'
	)

// 放入纸条
export const enterNote = (data: Data) =>
	APIFetch(
		{
			url: '/api/scrip/put',
			data,
		},
		'data'
	)

// 放入纸条 -- 列表
export const getPutList = (data: Data) =>
	APIFetch(
		{
			url: '/api/scrip/put_list',
			data,
		},
		'data.data'
	)

// 抽纸条
export const pickNote = (data: Data) =>
	APIFetch(
		{
			url: '/api/matching/filter',
			data,
		},
		'data.data'
	)

// 抽取纸条 -- 列表
export const getPickList = (data: Data) =>
	APIFetch(
		{
			url: '/api/matching/list',
			data,
		},
		'data.data'
	)

// 纸条 - 切换显示隐藏
export const toggleShow = (scrip_id: number, show: 1 | 2) =>
	APIFetch(
		{
			url: '/api/scrip/toggle',
			data: { scrip_id, show },
		},
		'data'
	)
