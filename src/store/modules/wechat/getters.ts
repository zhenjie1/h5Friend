import { RootState, RootGettersReturn } from '../../type'
import { ObjReturnType } from 'typings/utils'
import { GetterTree } from 'vuex'
import { State } from './state'
import { getName } from '@/assets/js/wechat'

type GroupGettersParam = ObjReturnType<Getters>

export type Getters = {
	groupG1(
		state: State,
		getters: GroupGettersParam,
		rootState: RootState,
		rootGetters: RootGettersReturn
	): void
	getCheckWechatName(
		state: State,
		getters: GroupGettersParam,
		rootState: RootState,
		rootGetters: RootGettersReturn
	): (wechat: Wechat.data) => string
}

const getters: GetterTree<State, RootState> & Getters = {
	groupG1: (state, g, R, RG) => 'state.badge',
	getCheckWechatName: () => (wechat) => {
		console.log('run')
		return getName(wechat)
	},
}

export default getters
