export type State = {
	badge: {
		// uin + wxId
		[key: string]: Message.badge
	}
	friends: {
		[uin: number]:
			| {
					[wxid: string]: Friend.data
			  }
			| undefined
	}
}

const state: State = {
	badge: {},
	/**
	 * 所有的微信好友数据
	 * 存储方式:
	 * {
	 * 		['微信号唯一标识']: {
	 * 			['好友唯一标识']: Friend.data
	 * 		}
	 * }
	 */
	friends: {},
}

export default state
