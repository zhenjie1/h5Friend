export {}

declare global {
	namespace Group {
		type data = FG.public & {
			isGroup: true
			chatRoomOwner: string // 群主的 wxId
			chatRoomQrCode?: string // 群二维码
			chatroomAnnouncement: string // 群公告
			chatroomNotify: 0 | 1 // 是否开启免打扰
			createTime: string // 加入群聊时间
			[key: string]: any
		}

		// 一个群成员的数据
		type member = {
			id: string
			wxId: string // 成员唯一标识
			nickName: string // 昵称
			headImgUrl: string // 头像
		}
	}
}
