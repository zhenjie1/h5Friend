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
export const getSchool = (page = 1, keyword?: string) =>
	APIFetch(
		{
			url: '/api/school/list',
			data: {
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
export const getPutList = () =>
	APIFetch(
		{
			url: '/api/scrip/put_list',
		},
		'data.data'
	)

// 抽取纸条 -- 列表
export const getPickList = () =>
	APIFetch(
		{
			url: '/api/matching/list',
		},
		'data.data'
	)
