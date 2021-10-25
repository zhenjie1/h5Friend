export {}

declare global {
	namespace Friend {
		type data = FG.public & {
			isFriend: true
			alias: string // 用户设置的微信号
			city: string // 城市
			sex: 0 | 1 // 性别
			signature: string // 个性签名
			createTime: string // 成为好友时间
			remarkPyInitial: string // 备注名拼音
			remarkPyQuanPin: string // 备注名全拼

			[key: string]: any
		}
	}
}
