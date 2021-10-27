import { onMounted } from 'vue'
import { getRef, scrollBottom } from '@/utils'

interface Options {
	api: (...args: any[]) => Promise<any>
	fn: (...args: any[]) => any
	el: string
	isInit: boolean
}

// 滚动到底自动加载下一页
export default function usePage(options: Options) {
	const page = {
		size: 30,
		index: 0,
		lock: false,
		total: 100, // 总页数, 不是总条数
	}

	const el = getRef(options.el) as any
	onMounted(() => {
		const loadMoreData = () => {
			const { index, lock, total } = page

			if (options.isInit) page.index = 0
			if (lock) return console.log('正在请求中...')
			if (!options.isInit && index >= total) return console.log('没有更多了')

			page.index++
			page.lock = true

			options
				.api(page)
				.then((res) => {
					console.log('res', res)
					console.log(page)
					page.total
					page.total = res.last_page
					options.fn && options.fn(res)
				})
				.finally(() => {
					page.lock = false
				})
		}

		scrollBottom(el.value, loadMoreData)

		loadMoreData()
	})
}
