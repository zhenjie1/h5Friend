<template>
	<div class="auditContent">
		<order-item></order-item>
	</div>
</template>

<script lang="ts">
import { api } from '@/api'
import orderItem from '@/components/common/orderItem.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'AuditContent',
	components: { orderItem },
	setup() {
		const list = ref()

		api.audit.getToBeReviewed().then((res) => {
			console.log(res)
			list.value = res
		})
		return {}
	},
})
</script>

<style lang="scss" scoped>
.auditContent {
}
</style>
