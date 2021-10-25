import { RootState, RootGettersReturn } from '../../type'
import { ObjReturnType } from 'typings/utils'
import { GetterTree } from 'vuex'
import { State } from './state'

type GroupGettersParam = ObjReturnType<Getters>

export type Getters = {
	getGroup(
		state: State,
		getters: GroupGettersParam,
		rootState: RootState,
		rootGetters: RootGettersReturn
	): (uin?: number) => Record<string, Group.data> | undefined
}

const getters: GetterTree<State, RootState> & Getters = {
	// 获取某微信号的群
	getGroup: (state) => (uin) => {
		if (!uin) return {}
		return state.groups[uin] || {}
	},
}

export default getters
