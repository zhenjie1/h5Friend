import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/home',
	},
	{
		path: '/home',
		component: () => import('page/home/home.vue'),
		meta: { title: '回眸缘遇' },
		children: [
			{
				path: 'put',
				component: () => import('@/page/home/put.vue'),
				meta: { title: '放入一个纸条' },
				children: [
					{
						path: 'hobby',
						component: () => import('@/components/common/hobby.vue'),
						meta: { title: '选择爱好' },
					},
					{
						path: 'school/:id?',
						component: () => import('@/components/common/school.vue'),
						meta: { title: '选择学校' },
					},
				],
			},
			{
				path: 'putList',
				component: () => import('@/page/home/putList.vue'),
				meta: { title: '放入列表' },
			},
			{
				path: 'pick',
				component: () => import('@/page/home/pick.vue'),
				meta: { title: '抽一个纸条' },
				children: [
					{
						path: 'hobby',
						component: () => import('@/components/common/hobby.vue'),
						meta: { title: '选择爱好' },
					},
					{
						path: 'school',
						component: () => import('@/components/common/school.vue'),
						meta: { title: '选择学校' },
					},
				],
			},
			{
				path: 'pickList',
				component: () => import('@/page/home/pickList.vue'),
				meta: { title: '抽取列表' },
			},
		],
	},
	{
		path: '/audit',
		component: () => import('@/page/audit/audit.vue'),
		meta: { title: '审核列表' },
	},
	{
		path: '/complaint',
		component: () => import('@/page/complaint.vue'),
		meta: { title: '审核列表' },
	},
	{
		path: '/pay',
		component: () => import('@/page/pay.vue'),
		meta: { title: '支付' },
	},
	{
		path: '/wxauth',
		component: () => import('@/page/wxauth.vue'),
		meta: { title: '微信授权' },
	},
	{
		path: '/wxauthBefore',
		component: () => import('@/page/wxauthBefore.vue'),
		meta: { title: '微信授权' },
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router

router.beforeEach((to, from, next) => {
	document.title = (to.meta.title as string) || '项目名称'

	next()
})
