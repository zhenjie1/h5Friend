import { name } from '@/assets/js/computed/chat'
import { strToJson } from '@/utils'
import APIFetch from '@/utils/fetch'
import { ApiTablePage } from 'typings/components/tablepage'

// 获取微信分组 - 列表
export const getGroups = (pageNum = 1, pageSize = 10) =>
	APIFetch({
		url: '/wechat.group.list.all',
		dataPath: 'data.data',
		data: { pageNum, pageSize },
		storePath: {
			list: {
				path: 'wechatGroup.all',
				handler(val: any[]) {
					val.map((v) => {
						v.children = v.weChatUsers
						v.label = v.groupName || v.remark
						v.value = v.id

						if (Array.isArray(v.children)) {
							v.children.map((v: any) => {
								v.label = name.value(v)
								v.value = v.uin
							})
						}
					})
					return val
				},
			},
		},
	})

export interface GroupList {
	customerServiceName: string
	groupId: number
	groupName: string
	groupUsersId: number[]
	userId: number
	weChatSum: number
}
// 获取微信分组 - 列表
export const getGroupList = (pageNum = 1, pageSize = 10) =>
	APIFetch<ApiTablePage<GroupList>>({
		url: '/wechat.new.group.list',
		dataPath: 'data.data',
		data: { pageNum, pageSize },
		storePath: {
			list: {
				path: 'wechatGroup.list',
				handler(list) {
					list.map((v: any) => (v.groupUsersId = strToJson(v.groupUsersId)))
					return list
				},
			},
		},
	})

// 微信分组 分配给指定客服
export const changeCustomer = (data: Data) =>
	APIFetch({
		url: '/allocation.customer.service',
		dataPath: 'data.data',
		data,
		storePath: false,
	})

// 微信分组 - 设置关键词回复
export const setKeyword = (data: Data) =>
	APIFetch({
		url: '/key.word.set',
		storePath: false,
		dataPath: 'data.data',
		data,
	})

type ChangeNameParams = Pick<GroupList, 'groupId' | 'groupName'>
// 修改微信分组名字
export const changeName = (data: ChangeNameParams) =>
	APIFetch({
		url: '/wechat.group.update',
		dataPath: 'data.data',
		data,
		storePath: false,
	})

// 删除一个分组
export const groupDelete = (groupId: number) =>
	APIFetch({
		url: '/wechat.group.del',
		data: { groupId },
		storePath: false,
	})

// 添加
export const add = (groupName: string) =>
	APIFetch({
		url: '/wechat.group.insert',
		data: { groupName },
		storePath: false,
	})
