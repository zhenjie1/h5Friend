export type State = {
	checkedWechat: Wechat.data | undefined
	badge: {
		[key: string]: Message.badge
	}
}

const groupState: State = {
	checkedWechat: undefined,
	// 锚点数据 (消息个数, 消息内容, 消息类型, 消息时间)
	badge: {},
}

export default groupState
