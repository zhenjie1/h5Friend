import { RootState, RootGettersReturn } from '../../type'
import { ObjReturnType } from 'typings/utils'
import { GetterTree } from 'vuex'
import { State } from './state'

type CGetters = ObjReturnType<Getters>

export type Getters = {
	test(
		state: State,
		getters: CGetters,
		rootState: RootState,
		rootGetters: RootGettersReturn
	): void
}

const getters: GetterTree<State, RootState> & Getters = {
	test: (state, g, R, RG) => 'state.badge',
}

export default getters
