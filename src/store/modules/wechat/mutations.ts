import { MutationTree } from 'vuex'
import { State } from './state'

export type Mutations<S = State> = {
	testMutations(state: S, payload: string): void
	saveCheckedWechat(state: S, payload: State['checkedWechat']): void
}

const mutations: MutationTree<State> & Mutations = {
	testMutations(state, value: string): void {
		console.log('modContact', value)
	},
	// 选中一个微信号
	saveCheckedWechat(state, wechat) {
		state.checkedWechat = wechat
	},
}

export default mutations
