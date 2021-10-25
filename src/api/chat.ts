import APIFetch from '@/utils/fetch'

// 获取微信分组列表
export const chhatWechatGroup = (type = 0) =>
	APIFetch(
		{
			url: '/wechat.wx.list',
			method: 'get',
			data: {
				type,
			},
			storePath: 'chat.wxList',
		},
		'data.data'
	)
