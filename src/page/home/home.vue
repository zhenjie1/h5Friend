<template>
	<div class="bg-R-0 home-page">
		<div class="container">
			<div class="boxContent">
				<div class="box" @click="toNav('/home/put')">放入</div>
				<div class="box" @click="toNav('/home/pick')">抽取</div>
				<div class="box" @click="toNav('/home/putList')">放入列表</div>
				<div class="box" @click="toNav('/home/pickList')">抽取列表</div>
				<div class="box" @click="toNav('/audit')">审核列表</div>
			</div>
		</div>
		<global-view></global-view>
	</div>
</template>

<script lang="ts">
import { api } from '@/api'
import { useStore } from '@/store'

import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	setup() {
		const router = useRouter()

		const store = useStore()
		store.dispatch('user/initUserInfo')
		return {
			toNav(path: string) {
				console.log(path)
				router.push({
					path,
				})
			},
		}
	},
})
</script>

<style lang="scss">
@import '../../assets/css/wechat.scss';
</style>

<style lang="scss" scoped>
.container {
	height: 100vh;
	background-image: linear-gradient(-135deg, #5d58e8, #3731be);
	display: flex;
	.maskContainer {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
	}

	.boxContent {
		@apply grid grid-cols-2 gap-4;
		margin: auto;
		.box {
			width: 30vw;
			height: 30vw;
			line-height: 30vw;
			text-align: center;
			box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
			border-radius: 6px;
			color: white;
			border: 1px solid rgba(255, 255, 255, 0.15);
		}
		// .box + .box {
		// 	margin-left: 20px;
		// }
	}
}
</style>
