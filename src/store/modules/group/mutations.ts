import { MutationTree } from 'vuex'
import { State } from './state'

export type Mutations<S = State, G = Group.data> = {
	groupPut(state: S, payload: G[] | { friends: G[]; replace: boolean }): void
}

const mutations: MutationTree<State> & Mutations = {
	// 添加 | 修改好友数据
	groupPut(state, options) {
		let friends: Group.data[]
		// 是将原数据替换, 还是合并
		let replace = false
		if (!Array.isArray(options)) {
			friends = options.friends
			replace = options.replace ?? false
		} else friends = options

		if (friends.length === 0) return

		const uin = friends[0].uin
		if (!state.groups[uin]) state.groups[uin] = {}

		friends.map((f) => {
			// 与老数据进行合并
			const oldFriend = state.groups[f.uin]![f.wxId]
			const newFriend = oldFriend
				? replace
					? f
					: { ...(oldFriend || {}), ...f }
				: f

			state.groups[f.uin]![f.wxId] = newFriend
		})
	},
}

export default mutations
