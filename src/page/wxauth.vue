<template>
	<div class="wxauth"></div>
</template>

<script lang="ts" setup>
import { api } from '@/api'
import store from '@/store'
import ajaxUrl, { getQueryString } from '@/utils/fetch/url'
import { Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 授权
function auth() {
	const code = getQueryString('code')
	const auth = route.query.auth

	// 强制走授权 或 没有携带微信返的 code
	if (auth == 'true' || !code) {
		location.href = ajaxUrl('ajax') + '/api/user/get_code'
		return
	}

	Toast.loading({
		duration: 0,
		forbidClick: true,
		message: '正在登录',
	})

	api.login
		.login(code)
		.then((res) => {
			store.commit('user/userinfo', res)
			router.replace('/')
		})
		.finally(() => {
			Toast.clear()
		})
}

auth()
</script>
