import { UnionToIntersection } from 'utility-types'
import { FlatIntersection, ValueOf } from './utils'
import { Modules } from './index'

type PrefiexedModules<T = Modules> = {
	[Key in keyof T]: Key extends string ? PrefixEach<Key, T[Key]> : never
}

type PrefixEach<K extends string, T> = {
	[Key in keyof T]: Prefix<K, T[Key]>
}

type Prefix<K extends string, T> = {
	[Key in keyof T as `${K}/${Key extends string & Key ? Key : never}`]: T[Key]
}

type RootGetValue<K extends 1 | 2 | 3> = FlatIntersection<
	UnionToIntersection<ValueOf<PrefiexedModules<Modules>>[K]>
>

export type RootState = { [K in keyof Modules]: Modules[K][0] }
export type RootActions = RootGetValue<1>
export type RootMutations = RootGetValue<2>
export type RootGetters = RootGetValue<3>
export type RootGettersReturn = {
	[K in keyof RootGetters]: ReturnType<RootGetters[K]>
}
