import { isFriend } from './tool'

// 为 好友、群聊添加必要字段
export function addNeedField(fg: FriendItem | FriendItem[], wechat: Wechat.data): void {
	if (Array.isArray(fg)) {
		fg.map((v) => addNeedField(v, wechat))
		return
	}

	fg.letter = getInitials(fg)

	if (isFriend(fg.wxId)) fg.isFriend = true
	else fg.isGroup = true

	if (wechat) {
		// 添加 id
		fg.id = `${wechat.uin}-${fg.wxId}`

		// 添加uin
		if (!fg.uin) fg.uin = wechat.uin

		// 添加属于的微信号
		fg.accountWxId = wechat.wxId
	}
}

// 获取好友、群聊数据中的首字母
export function getInitials(fg: FriendItem): string {
	if (!fg) return '#'

	const keys = ['remarkPyQuanPin', 'remarkPyInitial', 'pyInitial', 'pyQuanPin']

	for (let i = 0; i < keys.length; i++) {
		const item = fg[keys[i]]
		if (typeof item !== 'string') continue

		// 将首字母转大写
		const letter = item.charAt(0).toLocaleUpperCase()
		// 检查首字母是不是A-Z
		if (/^[A-Z]$/.test(letter)) return letter
	}

	return '#'
}
