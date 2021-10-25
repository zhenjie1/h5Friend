import { computed } from 'vue'

// 微信在线状态
export const status = computed(() => (status: Wechat.status) => {
	// 转为 string 类型
	if (typeof status === 'number') status = status.toString() as any as Wechat.status

	const data = {
		0: ['离线', 'gray'],
		1: ['在线', 'main'],
		2: ['异常', 'yellow'],
		3: ['封号', 'red'],
		4: ['登录中', 'gray'],
		5: ['重连中', 'gray'],
	}

	return data[status] || ['', '']
})

// 返回头像
export const avatar = computed(() => (item: any, fields: string[] = []) => {
	if (!item) {
		return 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
	}

	if (fields.length > 0) {
		const t = fields.find((k) => item[k])
		if (t) return item[t]
	}
	return (
		item.headImgUrl ||
		item.bigheadimgurl ||
		'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
	)
})

// 返回昵称
export const name = computed(() => (item: any) => {
	if (!item) return ''

	return item.remarkName || item.chatroomName || item.nickName || item.nickname || ''
})
