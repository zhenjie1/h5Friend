import { UnwrapRef } from 'vue-demi'
import { State } from './state'
import { PiniaCustomProperties, StoreWithGetters, GettersTree } from 'pinia'

type Getters = GettersTree<State> & ThisType<TG>

const getters: Getters = {
	getTest(state) {
		this
	},
}

export default getters

// type TG = ThisType<any>
type TG = UnwrapRef<State> & Getters & StoreWithGetters<Getters> & PiniaCustomProperties
