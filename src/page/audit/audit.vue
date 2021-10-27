<template>
	<div ref="auditContent" class="fullScreen auditContent pt-5">
		<order-item
			v-for="(item, index) in list"
			:key="index"
			class="orderItem"
			:data="item"
		></order-item>
	</div>
</template>

<script lang="ts">
import { api } from '@/api'
import orderItem from '@/components/common/orderItem.vue'
import { getRef } from '@/utils'
import usePage from 'js/page'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
	name: 'AuditContent',
	components: { orderItem },
	setup() {
		const list = ref([{}, {}])

		usePage({
			el: 'auditContent',
			api: () => api.audit.getToBeReviewed(),
			fn: (res) => {
				list.value = [...list.value, ...res.data]
			},
			isInit: false,
		})
		return {
			list,
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
