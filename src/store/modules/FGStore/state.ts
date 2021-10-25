export type State = {
	checkedFriend: FriendItem | undefined
}

const state: State = {
	checkedFriend: undefined,
	// 锚点数据 (消息个数, 消息内容, 消息类型, 消息时间)
}

export default state
