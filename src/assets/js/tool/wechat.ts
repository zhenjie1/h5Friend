/**
 * 根据传入的数据搜索
 *
 * @param {object} data : 要搜索的数据
 * @param {string} value : 搜索的值
 * @returns {Array} 返回搜索后的值
 */
export function searchFriendData(data: object[], value: string) {
	value = value.toLowerCase()
	const field = [
		'remarkName',
		'nickName',
		'remarkPyQuanPin',
		'remarkPyInitial',
		'pyInitial',
		'pyQuanPin',
	]

	return data.filter((friend) => {
		return field.some((key) => {
			const f = friend as any
			if (typeof f[key] !== 'string') return false
			return f[key].toLowerCase().indexOf(value) !== -1
		})
	})
}

/**
 *  获取微信、好友或群聊的名字
 */
export const getWechatName = (data: Data): string => {
	return data.remarkName || data.chatroomName || data.nickName || data.nickname || ''
}
