<template>
	<div class="itemContainer shadow-md mx-5 mb-5 p-4 rounded">
		<div class="container grid">
			<div class="info">
				<p class="wxid">
					<span class="iconfont icon-weixin mr-3"></span>
					<span class="wxid">{{ data.wechat_id }}</span>
				</p>
				<p v-if="data.school" class="school text-sm mt-3">
					<span class="label text-text-grayDeep mr-3">学校</span>
					<span class="value">{{ data.school.name }}</span>
				</p>
				<p v-if="data.intro" class="hobby text-sm mt-1">
					<span class="label text-text-grayDeep mr-3">介绍</span>
					<span class="value">{{ data.intro }}</span>
				</p>
			</div>
			<div class="hobby border-l border-border-color pl-3">
				<div v-for="(hobbyItem, i) in hobbyData" :key="i" class="hobbyItem mb-1">
					{{ hobbyItem }}
				</div>
				<p v-if="hobbyData.length == 0" class="text-sm text-text-light">暂无爱好</p>
			</div>
		</div>
		<div class="btns">
			<span v-if="data.status == 2" class="status">已通过</span>
			<span v-else-if="data.status == 3" class="status">已拒绝</span>
			<van-button v-if="data.status == 1" type="primary">通过</van-button>
			<van-button v-if="data.status == 1" type="primary" plain class="refuse">
				拒绝
			</van-button>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'OrderItem',
	props: {
		data: {
			type: Object,
			default: () => ({}),
		},
	},
	setup(props) {
		const hobbyData = computed(() => {
			if (typeof props.data.hobby === 'object') {
				if (!props.data.hobby) return []
				return props.data.hobby
			}
			return []
		})
		return {
			hobbyData,
		}
	},
})
</script>

<style lang="scss" scoped>
.itemContainer {
	background-color: white;
	.container {
		grid-template-columns: 3fr 1fr;
	}
	.btns {
		.btn {
			height: 40px;
		}
		.refuse {
			margin-left: 10px;
		}
	}
	.iconfont {
		color: var(--wechatColor);
	}
	.hobbyItem {
		border: 1px solid var(--main);
		display: inline-block;
		@apply px-2 rounded-full text-main text-sm;
	}
}
</style>
