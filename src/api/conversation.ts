import APIFetch from '@/utils/fetch'

// 获取某微信的会话数据
export const getConver = (wechat: Wechat.data) =>
	APIFetch({
		url: '/wechating.friend.list',
		method: 'get',
		dataPath: 'data.data',
		storePath: false,
		data: {
			uin: wechat.uin,
		},
	})
