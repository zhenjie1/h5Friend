import { onMounted, Ref, watch, ComputedRef, computed, reactive } from 'vue'
import { getRef, scrollBottom } from '@/utils'

interface Options {
	api: (...args: any[]) => Promise<any>
	el: string
	watch?: Ref<any> | (() => any)
	map?: (...args: any[]) => any
}

type Page<T = any> = {
	size: number
	index: number
	data: T[]
	lock: boolean
	total: number // 总页数, 不是总条数
	loadMoreData: (init?: boolean) => void
}

// 滚动到底自动加载下一页
export default function usePage<T = Data>(options: Options): ComputedRef<Page<T>> {
	const page: Page<T> = reactive({
		size: 30,
		index: 0,
		lock: false,
		data: [],
		total: 100, // 总页数, 不是总条数
		loadMoreData: loadMoreData,
	})

	const el = getRef(options.el) as any

	let isInit = false // 是否初始化 (从第一页开始)

	if (options.watch) {
		watch(options.watch, () => {
			isInit = true
			loadMoreData()
		})
	}

	function loadMoreData(init?: boolean): void {
		if (init) isInit = init
		const { index, lock, total } = page

		if (!isInit) {
			if (lock) return console.log('正在请求中...')
			if (index >= total) return console.log('没有更多了')
		} else {
			page.index = 0
			page.data = []
		}

		page.index++
		page.lock = true

		options
			.api(page)
			.then(({ last_page, data = [] }) => {
				page.total = last_page

				data = options.map ? data.map(options.map) : data
				page.data = isInit ? data : [...page.data, ...data]
			})
			.finally(() => {
				page.lock = false
			})
	}

	// 加载一页
	loadMoreData()

	onMounted(() => {
		scrollBottom(el.value, loadMoreData, -100)
	})

	return computed(() => page)
}
