<template>
	<div ref="scroll" class="putList">
		<ul class="container pt-5">
			<order-item v-for="(item, index) in list" :key="index" :data="item">
				<template #btns>
					<span class="align-middle mr-4">显示此纸条: </span>
					<van-switch
						v-model="item.showData"
						class="align-middle"
						:loading="item.loading"
						size="20px"
						@change="toggleShow(item)"
					></van-switch>
				</template>
			</order-item>
		</ul>
	</div>
</template>

<script lang="ts">
import { api } from '@/api'
import usePage from '@/assets/js/page'
import orderItem from '@/components/common/orderItem.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'PutList',
	components: { orderItem },
	setup() {
		const list = ref<Data[]>([])
		usePage({
			el: 'scroll',
			api: (page) => {
				return api.home.getPutList({ limit: page.size, page: page.index })
			},
			fn: (res) => {
				list.value = [...list.value, ...res.data].map((v) => {
					v.showData = v.show == 1
					return v
				})
			},
			isInit: false,
		})
		return {
			list,
			toggleShow(item: Data) {
				item.showData = !item.showData
				console.log(item)
				const show = item.show == 1 ? 2 : 1
				item.loading = true
				api.home
					.toggleShow(item.id, show)
					.then(() => {
						item.showData = !item.showData
					})
					.finally(() => (item.loading = false))
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.testimage {
	width: 200px;
	height: 200px;
}
.putList {
	.container {
		.item {
			background-color: white;
			grid-template-columns: 3fr 1fr;
			.iconfont {
				color: var(--wechatColor);
			}
			.hobbyItem {
				border: 1px solid var(--main);
				display: inline-block;
				@apply px-2 rounded-full text-main text-sm;
			}
		}
	}
}
</style>
