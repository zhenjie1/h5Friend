import store from '@/store'
import { isWx } from '@/utils'
import ajaxUrl from '@/utils/fetch/url'
import { ComponentOptionsMixin } from 'vue'

const authMixin = (): ComponentOptionsMixin => ({
	created() {
		if (store.state.user.userInfo?.token) return

		wxAuthStart.call(this)
	},
})
export default authMixin

// 前往微信授权
export async function wxAuthStart() {
	if (isWx()) {
		store.commit('user/changeAuthBeforeHref', location.href)
		location.href = ajaxUrl('ajax') + '/api/user/get_code'
	}
}
