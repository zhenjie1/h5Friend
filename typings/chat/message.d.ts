export {}

declare global {
	namespace Message {
		// 消息类型
		type msgType = '1' | '3' | '6' | '34' | '42' | '43' | '10000' | '10002'

		// 消息公共内容
		type MsgCommit = {
			createTime: number // 消息创建时间
			fromUserName: string // 消息来自谁
			toUserName: string // 消息谁发给谁的
			uin: number // 微信号 uin
			msgId: string // id
			messageId: string // 消息id
			newMsgIdStr: string // 消息id
			msgSeq: number // 未知
			msgSource: string // 微信返回的源数据
			msgType: msgType // 消息类型标识
			sendStatus: number // 发送状态
		}

		// 文字
		type Text = MsgCommit & {
			content: string // 内容
			uin: number // 微信号 uin
		}

		// 图片
		type Image = MsgCommit & {
			content: string // 图片地址
			fileName: string // 图片名字
			fileSize: string // 图片大小
			url: string // 未知
		}

		// 音频
		type Audio = MsgCommit & {
			content: string // 语音地址
			fileSize: string // 图片大小
		}

		// 视频
		type Video = MsgCommit & {
			content: string // 视频地址
			url: string // 微信返回的源数据
			fileSize: string // 视频大小
		}

		// 文件
		type File = MsgCommit & {
			content: string // 文件地址
			fileName: string // 文件名
			fileSize: string // 文件大小
		}

		// 名片
		type Card = MsgCommit & {
			content: string // xml 内容
		}

		// 未读消息数据统计
		type badge = {
			uin: number // 微信号 uin
			wxId: string // 好友、群聊的 wxId
			id: string // 微信号 uin + 好友 wxId 组成
			count: number // 计数
			messageContent: any // 显示的内容
			messageType: number // 消息类型
			messageTime: number // 时间
		}
	}
}
