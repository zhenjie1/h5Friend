import APIFetch from '@/utils/fetch'

// 关键字列表
export const list = (pageNum = 1, pageSize = 1000) =>
	APIFetch({
		url: '/weChat.keyWord.list.param.select',
		data: { pageNum, pageSize },
		dataPath: 'data.data',
		storePath: 'keyword.list',
	})
