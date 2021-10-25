import { MaybeRef } from '@vueuse/core'
import { ApiTablePage } from 'typings/components/tablepage'

export type Page = {
	index: number
	size: number
	total: number
}

// table 表格的分页数据
export type ListPage = {
	pageNum: MaybeRef<number>
	pageSize: MaybeRef<number>
}

type ReturnParams = ApiTablePage<any>

/**
 * 请求某接口的所有数据
 */
export function fetchPagination(
	awaitFn: (page: Page) => Promise<ReturnParams>,
	progressCb?: (progress: string) => void
) {
	if (typeof awaitFn !== 'function') throw new Error('参数类型必须为 function')
	const page: Page = { index: 1, size: 100, total: 10000 }

	return awaitFn(page).then((res) => {
		page.total = res.total
		const totalCount = Math.ceil(page.total / page.size) // 保存一共需要请求多少次
		const progress = ((page.index / (totalCount || 1)) * 100).toFixed(2)
		progressCb && progressCb(progress)

		if ([0, 1].includes(totalCount)) return res.list || []

		let forIndex = 1
		// 循环请求
		const fetchArray = new Array(totalCount - 1).fill(undefined).map((_, i) => {
			const index = i + 1
			const newPage = { ...page, index }
			return awaitFn(newPage).then((res) => {
				forIndex++
				const progress = ((forIndex / page.total) * 100).toFixed(2)
				progressCb && progressCb(progress)

				return res.list || []
			})
		}) as Promise<ReturnParams>[]

		return Promise.all(fetchArray).then((result) => {
			progressCb && progressCb('100')
			return result.map((v) => v.list).flat(1)
		})
	})
}
