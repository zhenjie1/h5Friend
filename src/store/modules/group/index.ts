import state, { State } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import { Module } from 'vuex'
import { RootState } from '../../type'

export * from './state'
export * from './actions'
export * from './mutations'
export * from './getters'

const groupStore: Module<State, RootState> = {
	namespaced: true,
	state,
	actions,
	getters,
	mutations,
}

export default groupStore
