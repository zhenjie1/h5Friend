import { MutationTree } from 'vuex'
import { tokenKey } from '@/assets/js/keys'
import Cookie from 'js-cookie'
import { State } from './state'

export type Mutations<S = State> = {
	userinfo(state: S, data: User.state): void
}

const mutations: MutationTree<State> & Mutations = {
	// 修改 userInfo
	userinfo(state, data) {
		state.userInfo = data
	},
}

export default mutations
