import { RootState, RootGettersReturn } from '../../type'
import { ObjReturnType } from 'typings/utils'
import { GetterTree } from 'vuex'
import { State } from './state'

type CGetters = ObjReturnType<Getters>

export type Getters = {
	getFriends(
		state: State,
		getters: CGetters,
		rootState: RootState,
		rootGetters: RootGettersReturn
	): (uin?: number) => Record<string, Friend.data> | undefined
}

const getters: GetterTree<State, RootState> & Getters = {
	getFriends: (state) => (uin) => {
		if (!uin) return {}
		return state.friends[uin] || {}
	},
}

export default getters
