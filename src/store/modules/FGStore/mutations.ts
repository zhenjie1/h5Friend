import { State } from './state'

export type Mutations<S = State, F = FriendItem> = {
	saveCheckedFriend(state: S, payload?: FriendItem): void
	friendPut(state: S, payload: F[] | { friends: F[]; replace: boolean }): void
}

const mutations: Mutations = {
	// 首页, 保存选中的好友
	saveCheckedFriend(state, friend) {
		state.checkedFriend = friend
	},
	// 添加 | 修改好友数据
	friendPut(state, options) {},
}

export default mutations
