import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('page/home/home.vue'),
		meta: { title: '首页', authority: true },
	},
]

const router = createRouter({
	history: createWebHashHistory('/folder/'),
	routes,
})

export default router

router.beforeEach((to, from, next) => {
	document.title = (to.meta.title as string) || '项目名称'

	next()
})
