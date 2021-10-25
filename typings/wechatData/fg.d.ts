export {}

declare global {
	type FriendItem = Friend.data | Group.data

	namespace FG {
		// 好友、群聊 公共都有的属性
		type public = {
			id: string // 微信号 uin + wxId
			uin: number
			accountWxId: string // 所属微信号的 wxId
			headImgUrl: string // 头像地址
			nickName: string // 昵称
			pyInitial: string // 拼音
			pyQuanPin: string // 拼音全拼
			remarkName: string // 备注名
			wxId: string // 微信id(唯一标识)
			op: 0 | 1 // 是否置顶
		}
	}
}
