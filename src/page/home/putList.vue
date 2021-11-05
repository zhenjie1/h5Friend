<template>
	<div ref="scroll" class="putList">
		<ul class="container pt-5">
			<order-item v-for="(item, index) in listData" :key="index" :data="item">
				<template #btns>
					<!-- <span>{{ Array.isArray(item.btns) }}</span> -->
					<van-button
						v-for="(btn, i) in item.btns"
						:key="i"
						class="btn copyBtn h-4 float-right"
						:type="btn.type"
						:loading="btn.loading"
						@click="btn.click(item, btn)"
					>
						{{ btn.text }}
					</van-button>
				</template>
			</order-item>
			<p v-if="list.data.length == 0" class="text-gray text-center mt-10">暂无数据</p>
		</ul>
	</div>
</template>

<script lang="ts">
import { api } from '@/api'
import { orderPayStart } from '@/api/order'
import usePage from '@/assets/js/page'
import orderItem from '@/components/common/orderItem.vue'
import { copyText } from '@/utils'
import { Toast } from 'vant'
import { defineComponent, computed } from 'vue'

export default defineComponent({
	name: 'PutList',
	components: { orderItem },
	setup() {
		// 切换显示隐藏纸条
		const toggleShow = (item: Data, btn: Data) => {
			btn.loading = true

			const show = item.show == 1 ? 2 : 1
			api.home
				.toggleShow(item.id, show)
				.then(() => {
					item.showData = !item.showData
				})
				.finally(() => (btn.loading = false))
		}

		const list = usePage({
			el: 'scroll',
			api: (page) => {
				return api.home.getPutList({ limit: page.size, page: page.index })
			},
			map: (v: any) => {
				v.showData = v.show == 1
				return v
			},
		})

		// 数据
		const listData = computed(() => {
			return list.value.data.map((v) => {
				const isPay = v.orders?.pay_status == 1 // 已支付
				const isWaitPay = v.orders?.pay_status == 0 // 待支付
				v.btns = [
					{
						text: '复制微信号',
						type: 'primary',
						click: copy,
						loading: false,
						show: isPay,
					},
					{
						text: v.showData ? '隐藏纸条' : '显示纸条',
						type: v.showData ? 'default' : 'danger',
						loading: false,
						click: toggleShow,
						show: isPay,
					},
					{
						text: '去支付',
						type: 'primary',
						loading: false,
						show: isWaitPay,
						click: toOrderPay,
					},
				].filter((v: Data) => v.show)
				return v
			})
		})

		// 根据订单支付
		const toOrderPay = (item: Data, btn: Data) => {
			btn.loading = true
			orderPayStart(item.order_no)
				.then((res) => {
					list.value.loadMoreData(true)
					console.log('支付结果', res)
				})
				.finally(() => (btn.loading = false))
		}

		const isPay = (item: Data) => item.orders?.pay_status === 1
		const copy = (item: Data) => {
			copyText(item.wechat_id)
			Toast('复制成功')
		}

		return {
			listData,
			list,
			isPay,
			copy,
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
