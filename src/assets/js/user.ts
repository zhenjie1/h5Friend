import { tokenKey } from '@/assets/js/keys'
import store, { rootInitState } from '@/store'
import Cookie from 'js-cookie'

// 清除用户数据
export function clearUserCache() {
	console.warn('清空缓存的数据')

	Cookie.remove(tokenKey.refresh)
	Cookie.remove(tokenKey.access)

	localStorage.setItem('vuex', '{}')

	store.replaceState(Object.assign(store.state, rootInitState))
}
