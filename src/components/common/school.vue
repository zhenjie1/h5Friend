<template>
	<div ref="box" class="school">
		<div class="search bg-bg-check mx-auto w-11/12 my-5 rounded-full flex items-center">
			<i class="iconfont icon-sousuo align-middle w-12 text-center"></i>
			<input v-model="search" class="align-middle h-10 flex-1 pr-5" />
		</div>

		<ul class="schoolContent">
			<li
				v-for="(item, index) in listData"
				:key="index"
				class="px-4 item"
				@click="clickItem(item)"
			>
				<i class="iconfont icon-xuexiao mr-3 text-gray"></i>
				<span v-html="item.checkName"></span>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { api } from '@/api'
import { computed, defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { homeBus } from '@/page/home/put.vue'
import usePage from '@/assets/js/page'

export default defineComponent({
	name: 'School',
	setup() {
		const router = useRouter()
		const route = useRoute()

		const search = ref('')
		const cityId = computed(() => (route.params.id === '' ? undefined : route.params.id))
		const list = usePage({
			el: 'box',
			api: (page) =>
				api.home.getSchool(
					{ china_id: page.isInit ? undefined : cityId.value },
					page.index,
					search.value
				),
			watch: search,
		})
		const listData = computed(() => {
			const reg = new RegExp(`(.*)(${search.value})(.*)`, 'ig')
			const newData = list.value.data.map((v) => {
				v.checkName = v.name.replace(reg, '$1<span class="schoolMatchText">$2</span>$3')
				return v
			})
			return newData
		})

		return {
			search,
			list,
			listData,
			// loadMoreData,
			clickItem(item: Data) {
				homeBus.emit('setSchool', item)
				router.back()
			},
		}
	},
})
</script>

<style lang="scss" scoped>
::v-deep(.schoolMatchText) {
	color: var(--main);
}
.school {
	padding: 1px;
	box-sizing: border-box;
	.schoolContent {
		.item {
			line-height: 50px;
			&:active {
				background-color: var(--bgCheck);
			}
		}
	}
}
</style>
