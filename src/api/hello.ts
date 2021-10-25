// 欢迎语

import APIFetch from '@/utils/fetch'
import { ApiTablePage } from 'typings/components/tablepage'

type HelloList = {
	createTime: string
	groupId: number
	id: number
	templateCount: number
	templateName: string
	userId: number
	updateTime: string
}
// 欢迎语模版列表
export const list = (pageNum = 1, pageSize = 1000) =>
	APIFetch<ApiTablePage<HelloList>>({
		url: '/query.wechat.welcome.template.list',
		data: { pageNum, pageSize },
		dataPath: 'data.data',
		storePath: false
	})

export type SetHelloParams = {
	cServiceIds: number[]
	groupIds: number[]
	isTurnOn: number
	timeInterval: string
	wechatKeyGroupName: number
	welcomeTemplateId: number
}
// 给微信分组设置欢迎语
export const setHello = (data: SetHelloParams) =>
	APIFetch({
		url: '/set.welcome.speech',
		data,
		storePath: false,
	})
