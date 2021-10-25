// 请求返回的结构
export interface ApiTablePage<T> {
	list: T[]
	total: number
	pageNum: number
	pageSize: number
	pages: number
	size: number
	isFirstPage: boolean // 是否是第一页
	isLastPage: boolean // 是否是最后一页
	hasPreviousPage: boolean // 是否有上一页
	hasNextPage: boolean // 是否有下一页
}
