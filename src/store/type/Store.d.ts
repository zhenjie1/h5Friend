import { CommitOptions, DispatchOptions, Store as VuexStore } from 'vuex'
import { RootActions, RootGetters, RootMutations, RootState } from './Root'
import { PayloadAndOptionsTuple } from './utils'

export type UseStore = Omit<VuexStore<RootState>, 'getters' | 'commit' | 'dispatch'> & {
	commit<K extends keyof RootMutations, P extends Parameters<RootMutations[K]>[1]>(
		key: K,
		...params: PayloadAndOptionsTuple<P, CommitOptions>
	): ReturnType<RootMutations[K]>
	dispatch<K extends keyof RootActions, P extends Parameters<RootActions[K]>[1]>(
		key: K,
		...params: PayloadAndOptionsTuple<P, DispatchOptions>
	): ReturnType<RootActions[K]>
	getters: {
		[K in keyof RootGetters]: ReturnType<RootGetters[K]>
	}
}
