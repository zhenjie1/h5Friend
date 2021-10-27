<template>
	<div class="hobby">
		<span v-for="(item, index) in list" :key="index" class="item" @click="clickItem(item)">
			{{ item.name }}
		</span>
	</div>
</template>

<script lang="ts">
import { api } from '@/api'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { homeBus } from '@/page/home/put.vue'

export default defineComponent({
	name: 'Hobby',
	setup() {
		const router = useRouter()

		const list = ref<Data[]>([])

		api.home.getHobby().then((res: Data[]) => {
			console.log(res)
			list.value = res
		})
		return {
			list,
			clickItem(item: Data) {
				homeBus.emit('setHobby', item)
				router.back()
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.hobby {
	@apply pl-3 pt-3 box-border;
	.item {
		@apply px-4 py-3 bg-bg-check mr-3 mb-3 rounded-full;
		line-height: 1;
	}
}
</style>
