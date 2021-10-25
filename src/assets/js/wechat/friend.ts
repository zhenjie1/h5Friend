import { api } from '@/api'
import store from '@/store'

export const friendTools = {
	// 初始化某微信号的所有好友
	initAllFriendGroup(wechat: Wechat.data) {
		const friend = api.friend.friendList(wechat)
		const group = api.group.groupList(wechat)

		Promise.allSettled([friend, group]).then((res) => {
			const [f, g] = res
			if (f.status === 'fulfilled') {
				store.commit('friend/friendPut', f.value)
			}
			if (g.status === 'fulfilled') {
				store.commit('group/groupPut', g.value)
			}
		})
	},
	initConver(wechat: Wechat.data) {
		api.conver.getConver(wechat)
	},
}

export default friendTools
