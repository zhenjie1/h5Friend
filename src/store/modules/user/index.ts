import friendState from './state'
import actions from './actions'
import mutations from './mutations'

export * from './state'
export * from './actions'
export * from './mutations'
export * from './getters'

const userStore = {
	namespaced: true,
	state: friendState,
	actions,
	mutations,
}
export default userStore
