import { MutationTree } from 'vuex'
import { tokenKey } from '@/assets/js/keys'
import Cookie from 'js-cookie'
import { State } from './state'

export type Mutations<S = State> = {
	changeAccessToken(state: S, newToken: string): void
	changeRefreshToken(state: S, newToken: string): void
	changeUserInfo(state: S, newToken: User.state): void
}

const mutations: MutationTree<State> & Mutations = {
	// 修改 accessToken
	changeAccessToken(state, newToken) {
		Cookie.set(tokenKey.access, newToken, { expires: 29 / 60 / 24 }) // 有效期 29 分钟
		state.accessToken = newToken
	},
	// 修改 refreshToken
	changeRefreshToken(state, newToken: string) {
		Cookie.set(tokenKey.refresh, newToken, { expires: 1 }) // 有效期 1 天
		state.refreshToken = newToken
	},
	// 修改用户信息
	changeUserInfo(state, userInfo) {
		Object.assign(state.userInfo || {}, userInfo)
	},
}

export default mutations
