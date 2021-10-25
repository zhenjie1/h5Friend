import { isObject } from 'lodash'

type IsSomeFriendParam = Friend.data | Group.data | undefined
/**
 * 传入两条数据, 判断是不是同一个人 或 微信号
 *
 * @param {IsSomeFriendParam} v1 数据
 * @param {IsSomeFriendParam} v2 数据
 * @returns {boolean} 返回结果
 */
export function isSomeFriend(v1: IsSomeFriendParam, v2: IsSomeFriendParam): boolean {
	if (!v1 || !v2 || !isObject(v1) || !isObject(v2)) return false

	if (v1.uin === v2.uin && v1.wxId === v2.wxId) return true

	return false
}

/**
 * 获取微信号、好友、群聊或群名称的名字
 *
 * @param {any} data 数据
 * @returns {string} 返回名字
 */
export function getName(data: any): string {
	if (typeof data !== 'object') return ''

	const keys = ['remarkName', 'chatroomName', 'nickName', 'nickname']

	const key = keys.find((k) => data[k])
	if (!key) return ''

	return data[key]
}

/**
 * 检查是不是群聊
 *
 * @param {string} wxId 好友或群的 wxId
 * @returns {boolean} 返回布尔值
 */
export function isGroup(wxId: string): boolean {
	return /(@chatroom)$/.test(wxId)
}

/**
 * 检查是不是好友
 *
 * @param {string} wxId 好友或群的 wxId
 * @returns {boolean} 返回布尔值
 */
export function isFriend(wxId: string): boolean {
	return !isGroup(wxId)
}
