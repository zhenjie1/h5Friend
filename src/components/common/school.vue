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
import { debounce } from 'lodash'
import { api } from '@/api'
import { scrollBottom } from '@/utils'
import { computed, defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { homeBus } from '@/page/home/put.vue'

export default defineComponent({
	name: 'School',
	setup() {
		const router = useRouter()
		const page = {
			index: 0,
			size: 30,
			lock: false,
			last_page: 100,
		}

		const list = ref<Data[]>([])
		const listData = computed(() => {
			const reg = new RegExp(`(.*)(${search.value})(.*)`, 'ig')
			const newData = list.value.map((v) => {
				v.checkName = v.name.replace(reg, '$1<span class="schoolMatchText">$2</span>$3')
				return v
			})
			return newData
		})

		const search = ref('')
		watch(
			search,
			debounce((val) => {
				console.log(val)
				loadMoreData(true)
			}, 300)
		)

		// 获取下一页数据
		const loadMoreData = (isInit = false) => {
			const { index, lock, last_page } = page
			if (isInit) page.index = 0

			if (lock) return console.log('正在请求中...')
			if (!isInit && index >= last_page) return console.log('没有更多了')

			page.index++
			page.lock = true
			api.home
				.getSchool(page.index, search.value)
				.then((res) => {
					list.value = isInit ? res.data : [...list.value, ...res.data]

					page.last_page = res.last_page
					console.log(res)
				})
				.finally(() => (page.lock = false))
		}
		loadMoreData()

		return {
			search,
			list,
			listData,
			loadMoreData,
			clickItem(item: Data) {
				homeBus.emit('setSchool', item)
				router.back()
			},
		}
	},
	mounted() {
		scrollBottom(
			this.$refs.box as Element,
			() => {
				this.loadMoreData()
			},
			200
		)
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
