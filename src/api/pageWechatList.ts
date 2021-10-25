import APIFetch from '@/utils/fetch'
import { ApiTablePage } from 'typings/components/tablepage'
import { ListPage } from './apiTool'

export interface WechatListFilter extends ListPage {
	uins: number[]
	status?: string
	nickName?: string
	isChangeCipher?: 0 | 1
	isBindingPhone?: 0 | 1
	[key: string]: any
}

// 微信列表数据
export const list = (filter: WechatListFilter) => (cacheCb?: (res: ApiTablePage<any>) => void) =>
	APIFetch<ApiTablePage<any>>({
		url: '/wechat.pool.allocated.list',
		data: {
			...filter,
		},
		// params: { ...filter },
		// method: 'get',
		exclude: [[], '', undefined],
		dataPath: 'data.data',
		storePath: 'wechatList.list',
		cacheCb,
	})
