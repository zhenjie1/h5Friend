import { api } from '@/api'
import { ActionTree } from 'vuex'
import { ActionContext, RootState } from '../../type'
import { State } from './state'
import store from '@/store'

type Context = ActionContext<'user'>

export type Actions = {
	initUserInfo(context: Context): Promise<any>
}

const actions: ActionTree<State, RootState> = {
	// 换取新的 token 并保存
	async initUserInfo() {
		const data = await api.login.getToken()

		store.commit('user/userinfo', data)
	},
}

export default actions
