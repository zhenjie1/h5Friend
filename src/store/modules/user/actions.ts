import { api } from '@/api'
import { ActionTree } from 'vuex'
import { ActionContext, RootState } from '../../type'
import { State } from './state'
import store from '@/store'

type Context = ActionContext<'user'>

export type Actions = {
	exchangeForNewToken(context: Context): Promise<any>
}

const actions: ActionTree<State, RootState> = {
	// 换取新的 token 并保存
	async exchangeForNewToken() {
		const { data: newToken, code } = await api.user.getNewToken()
		if (code !== 100000) throw new Error('换取 token 异常')
		store.commit('user/changeAccessToken', newToken)
	},
}

export default actions
