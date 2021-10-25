import { ActionContext, RootState } from '../../type'
import { ActionTree } from 'vuex'
import { State } from './state'

type Context = ActionContext<'group'>

export type Actions = {
	testActions(context: Context, p: string): Promise<any>
}

const actions: ActionTree<State, RootState> & Actions = {
	async testActions({ commit, state, getters, dispatch }, p) {},
}

export default actions
