<template>
	<div class="putList">
		<ul class="container pt-5">
			<order-item v-for="(item, index) in list" :key="index" :data="item"></order-item>
		</ul>
	</div>
</template>

<script lang="ts">
import { api } from '@/api'
import orderItem from '@/components/common/orderItem.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'PutList',
	components: { orderItem },
	setup() {
		const list = ref<Data[]>([])
		api.home.getPickList().then((res) => {
			list.value = res
		})
		return {
			list,
		}
	},
})
</script>

<style lang="scss" scoped>
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
