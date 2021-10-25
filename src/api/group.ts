import { addNeedField } from '@/assets/js/wechat/fg'
import APIFetch from '@/utils/fetch'
import { fetchPagination, Page } from './apiTool'

// 获取某微信所有的好友
export const groupList = (wechat: Wechat.data, progressCb?: (num: string) => void) => {
	progressCb && progressCb('1')

	const awaitFn = (page: Page) =>
		APIFetch({
			url: '/wechat.friend.list',
			method: 'get',
			timeout: 2 * 60 * 1000,
			storePath: false,
			dataPath: 'data.data',
			data: {
				weChatUserId: wechat.wxId,
				pageNum: page.index,
				pageSize: page.size,
				sign: 2, // 1 好友  2 群聊
			},
		})

	return fetchPagination(awaitFn).then((res) => {
		if (Array.isArray(res)) res.map((v) => addNeedField(v, wechat))
		return res
	})
}
