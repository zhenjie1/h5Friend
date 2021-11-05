import { createStore, useStore as baseUseStore } from 'vuex'
import { UseStore } from './type'
import userStore from './modules/user/index'
import createPersistedState from 'vuex-persistedstate'
import { cloneDeep } from 'lodash'

export const modules: Data = {
	user: userStore,
}

// 拷贝一份 state 的初始化配置
// 方便在初始化 vuex state 时使用
export const rootInitState: Data = {}
for (const i in modules) rootInitState[i] = cloneDeep(modules[i].state)

const store = createStore({
	modules,
	strict: true,
	plugins: [createPersistedState()],
}) as UseStore

export default store

export function useStore(): UseStore {
	return baseUseStore()
}
