<template>
	<div ref="auditContent" class="fullScreen auditContent pt-5">
		<order-item
			v-for="(item, index) in list.data"
			:key="index"
			class="orderItem"
			shrink-image
			:data="item"
			@click.capture="clickItem(index)"
		>
			<template #btns>
				<div class="btns">
					<span v-if="item.status == 2" class="status">已通过</span>
					<span v-else-if="item.status == 3" class="status">已拒绝</span>
					<van-button
						v-if="item.status == 1"
						class="btn"
						type="primary"
						@click="adopt(item)"
					>
						通过
					</van-button>
					<van-button
						v-if="item.status == 1"
						class="btn"
						type="primary"
						plain
						@click="show.reject = true"
					>
						拒绝
					</van-button>
					<van-button class="btn" type="primary" plain @click="show.image">
						查看照片
					</van-button>
				</div>
			</template>
		</order-item>
		<p v-if="list.data.length == 0" class="text-gray text-center mt-10">暂无数据</p>

		<van-action-sheet
			v-model:show="show.reject"
			description="拒绝理由"
			:actions="rejectReason"
			cancel-text="取消"
			@select="onReject"
		>
		</van-action-sheet>
	</div>
</template>

<script lang="ts">
import { api } from '@/api'
import orderItem from '@/components/common/orderItem.vue'
import usePage from 'js/page'
import { ImagePreview, Toast } from 'vant'
import { computed, defineComponent, reactive, ref } from 'vue'

export default defineComponent({
	name: 'AuditContent',
	components: { orderItem },
	setup() {
		// 数据
		const list = usePage({
			el: 'auditContent',
			api: (page) => {
				return api.audit.getToBeReviewed({ limit: page.size, page: page.index })
			},
		})
		// 选中的索引
		const checkIndex = ref<number>(0)
		// 计算属性 - 返回选中的 item 数据
		const checkItem = computed(() => {
			return list.value.data[checkIndex.value]
		})

		const rejectReason = [{ name: '信息不符' }, { name: '信息违规' }, { name: '没有理由' }]

		const show = reactive({
			reject: false,
			image() {
				const images = computed(() => {
					return checkItem.value.images || checkItem.value.scrip_images
				})

				if (!images.value || images.value.length == 0) return Toast('此用户未上传图片')

				ImagePreview({
					images: images.value,
					startPosition: 0,
				})
			},
		})
		return {
			list,
			show,
			checkItem,
			rejectReason,
			async adopt(item: Data) {
				await api.audit.audit(item.id, 1)
				show.reject = false
				Toast('已通过')
				list.value.data.splice(checkIndex.value, 1)
			},
			async onReject(item: Data) {
				await api.audit.audit(checkItem.value.id, 2, item.name)
				Toast('已拒绝')
				list.value.data.splice(checkIndex.value, 1)
				show.reject = false
			},
			clickItem(index: number) {
				checkIndex.value = index
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.auditContent {
	.orderItem {
	}
}
</style>
