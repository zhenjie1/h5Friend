import { acceptHMRUpdate, StoreDefinition } from 'pinia'
import FGStore from './FGStore/index'

export const useFGStore = FGStore

// for (const store of stores) {
// 	const item = stores[i]
// 	if (import.meta.hot) {
// 		import.meta.hot.accept(acceptHMRUpdate(stores[i], import.meta.hot))
// 	}
// }
