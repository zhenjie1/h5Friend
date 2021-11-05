import { MutationTree } from 'vuex'
import { State } from './state'

export type Mutations<S = State> = {
	userinfo(state: S, data: User.state): void
	changeAuthBeforeHref(state: S, url: string): void
}

const mutations: MutationTree<State> & Mutations = {
	// 修改 userInfo
	userinfo(state, data) {
		state.userInfo = data
	},
	// 修改前往授权之前的页面
	changeAuthBeforeHref(state, href) {
		state.authBeforeHref = href
	},
}

export default mutations
