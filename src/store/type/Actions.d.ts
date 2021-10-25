import { CommitOptions, DispatchOptions, ActionContext as ACT, Action, ActionObject } from 'vuex'
import { Modules } from './index'
import { RootMutations, RootActions, RootState, RootGetters } from './Root'
import { PayloadAndOptionsTuple, ValueOf } from './utils'

export type GetPropValue<
	Space extends keyof Modules,
	K extends keyof Modules[Space]
> = Modules[Space][K]

type ModuleActions = ValueOf<Modules>[1]
type ModuleGetters = ValueOf<Modules>[3]

export type ActionContext<
	Space extends keyof Modules,
	State = GetPropValue<Space, 0>,
	Actions extends ModuleActions = GetPropValue<Space, 1>,
	Mutations = GetPropValue<Space, 2>,
	Getters extends ModuleGetters = GetPropValue<Space, 3>
> = {
	commit<
		K extends keyof RootMutations,
		P extends Parameters<RootMutations[K]>[1],
		O extends CommitOptions & { root: true }
	>(
		key: K,
		payload: P,
		options: O
	): ReturnType<RootMutations[K]>
	commit<
		K extends keyof Mutations,
		P extends Parameters<Mutations[K]>[1],
		O extends CommitOptions & { root?: false }
	>(
		key: K,
		...params: PayloadAndOptionsTuple<P, O>
	): ReturnType<Mutations[K]>

	dispatch<
		K extends keyof RootActions,
		P extends Parameters<RootActions[K]>[1],
		O extends DispatchOptions & { root: true }
	>(
		key: K,
		payload: P,
		options: O
	): ReturnType<RootActions[K]>
	dispatch<
		K extends keyof Actions,
		P extends Parameters<ExtractActionHandler<Actions[K]>>[1],
		O extends DispatchOptions & { root: false }
	>(
		key: K,
		...params: PayloadAndOptionsTuple<P, O>
	): ReturnType<ExtractActionHandler<Actions[K]>>

	getters: {
		[K in keyof Getters]: ReturnType<Getters[K]>
	}
	rootGetters: {
		[K in keyof RootGetters]: ReturnType<RootGetters[K]>
	}
} & Omit<ACT<State, RootState>, 'commit' | 'dispatch' | 'getters' | 'rootGetters'>

type ExtractActionHandler<A> = A extends Action<infer S, infer R>
	? A extends ActionObject<S, R>
		? A['handler']
		: A
	: never
