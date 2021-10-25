import { useSocket } from '@/plugins/socket'

const wechatTools = {
	// 刷新某个微信号的好友群聊、会话数据
	reloadAllFriendGroup(wechat: Wechat.data): void {
		const { send, receive } = useSocket()
		send('reloadContact', { uin: wechat.uin })

		receive(311, (data) => {
			console.warn(data)
			// 	if (data.tag !== 311 || data.data !== wechat.uin) return
		})
		// receive('codeError', (data) => {
		// 	console.warn(data)
		// 	if (data.tag !== 311 || data.data !== wechat.uin) return
		// })
	},
}

export default wechatTools
