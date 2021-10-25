import { defineStore, acceptHMRUpdate, DefineStoreOptions } from 'pinia'
import state from './state'
import actions from './actions'

const FGStore = defineStore('fg', {
	state: () => state,
	getters: {
		getFriend(state) {
			return state.checkedFriend?.accountWxId
		},
	},
	actions,
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(FGStore, import.meta.hot))
}

export default FGStore
