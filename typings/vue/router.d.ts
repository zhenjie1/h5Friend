import 'vue-router'

declare module 'vue-router' {
	interface RouteMeta {
		// 标题
		title: string

		// 权限 key
		authority: string | boolean

		// 图标
		icon?: string

		// 是否需要管理员身份
		isAdmin?: boolean

		// 是否需要全屏显示
		fullScreen?: boolean

		// 账户过期后是否隐藏
		overdueHide?: boolean
	}
}
