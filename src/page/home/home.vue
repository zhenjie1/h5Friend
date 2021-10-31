<template>
	<div class="home-page">
		<van-swipe class="swiper">
			<van-swipe-item>
				<img
					src="../../assets/images/banner/banner1.png"
					class="bannerImage"
					alt="banner"
				/>
			</van-swipe-item>
			<van-swipe-item>
				<img
					src="../../assets/images/banner/banner2.png"
					class="bannerImage"
					alt="banner"
				/>
			</van-swipe-item>
		</van-swipe>
		<div class="page-container">
			<div class="mainButton">
				<div class="btnContainer put" @click="toNav('/home/put')">
					<i class="iconfont icon-put icon"></i>
					<div class="info">
						<p class="title">放入一张纸条</p>
						<p class="desc">放入纸条，审核通过后即可被别人抽到</p>
					</div>
				</div>
				<div class="btnContainer pick" @click="toNav('/home/pick')">
					<i class="iconfont icon-pick icon"></i>
					<div class="info">
						<p class="title">抽取一张纸条</p>
						<p class="desc">想认识Ta，快来抽取纸条吧</p>
					</div>
				</div>
			</div>
			<!-- <div class="otherButton">
				<div class="box" @click="toNav('/home/putList')">放入列表</div>
				<div class="box" @click="toNav('/home/pickList')">抽取列表</div>
				<div class="box" @click="toNav('/audit')">审核列表</div>
				<div class="box" @click="toNav('/complaint')">投诉建议</div>
			</div> -->
		</div>
		<van-cell-group class="mx-5 mt-5">
			<van-cell
				title="放入列表"
				size="large"
				is-link
				@click="toNav('/home/putList')"
			></van-cell>
			<van-cell
				title="抽取列表"
				size="large"
				is-link
				@click="toNav('/home/pickList')"
			></van-cell>
			<van-cell title="审核列表" size="large" is-link @click="toNav('/audit')"></van-cell>
			<van-cell title="投诉建议" size="large" is-link @click="toNav('/complaint')"></van-cell>
		</van-cell-group>
		<global-view></global-view>
	</div>
</template>

<script lang="ts">
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
.home-page {
	// background-image: linear-gradient(-135deg, #2721d1, #4d0c95);
	// background-image: linear-gradient(-135deg, #5d58e8, #3731be);
	.swiper {
		width: 90%;
		border-radius: 2px;
		margin: 20px auto;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
		.bannerImage {
			height: 36vw;
		}
	}
}
.page-container {
	// height: 40vh;
	.maskContainer {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
	}

	.otherButton {
		width: 90%;
		margin: auto;
		@apply grid grid-cols-4 gap-2 mt-4 text-base;

		.box {
			$size: 40px;
			// width: $size;
			height: $size;
			line-height: $size;
			text-align: center;
			// box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
			border-radius: 6px;
		}
	}

	.mainButton {
		margin: auto;
		width: calc(100% - 40px);
		@apply grid grid-cols-2 gap-4;
		margin: auto;
		.btnContainer {
			@apply flex;
			.icon {
				@apply flex-shrink-0 w-6 h-6 text-center leading-6 bg-main text-white rounded-full text-xs;
			}
			&.pick .icon {
				background-color: #ef6d21;
			}
			.info {
				@apply flex-1 ml-3;
				.desc {
					@apply text-xs text-text-gray;
				}
			}
		}
	}
}
</style>
