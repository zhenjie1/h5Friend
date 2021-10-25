export {}

declare global {
	namespace Wechat {
		type status = 0 | 1 | 2 | 3 | 4 | 5
		type data = {
			id: string
			headImgUrl: string // 头像
			nickName: string // 昵称
			groupId: number // 所在分组的分组 ID
			status: status // 状态
			uin: number // 微信号唯一标识
			wxId: string // 微信号 wxId
			[key: string]: any
		}
	}
}
