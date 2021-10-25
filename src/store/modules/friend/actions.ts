import { ActionTree } from 'vuex'
import { ActionContext, RootState } from '@/store/type'
import { State } from './state'

type Context = ActionContext<'friend'>

export type Actions = {
	testActions(context: Context, p: string): Promise<any>
}

const actions: ActionTree<State, RootState> & Actions = {
	async testActions({ commit, state, getters, dispatch, rootGetters }, p) {
		dispatch('group/testActions', '123', { root: true })
	},
}

export default actions
