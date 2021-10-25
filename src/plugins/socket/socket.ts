import { tokenKey } from '@/assets/js/keys'
import ajaxUrl from '@/utils/fetch/url'
import initSocketEvent, { socketAbnormal } from './socketEvent'
import cookies from 'js-cookie'
import { isDev } from '@/utils'
import store from '@/store'
import SocketEvent from './event'
import { ref } from 'vue'

export default class SocketListener {
	event: SocketEvent = new SocketEvent()

	/**
	 * readyState: socket 连接状态
	 * 0: 正在建立连接连接，还没有完成
	 * 1: 连接成功建立，可以进行通信
	 * 2: 连接正在进行关闭握手，即将关闭
	 * 3: 连接已经关闭或者根本没有建立
	 */
	sockets?: WebSocket

	// 是否已经连接成功了
	ready = ref(true)

	// 重连次数
	reconnectCount = ref(0)

	// 心跳的间隔时间
	heartbeatTime = isDev ? 30 : 10

	/**
	 * 准备发送但因 socket 状态异常未发送的数据
	 * 将在 socket 重连成功后尝试发送
	 */
	sendPools: { name: string; data: string }[] = []
	heartbeatTimeObj?: NodeJS.Timeout // 心跳定时器对象

	// 开始建立连接
	startConnect() {
		// 重连次数增加
		this.reconnectCount.value++

		const isopen = this.createSocket()
		if (!isopen) return

		initSocketEvent(this)
		this.initHeartbeat()
	}

	constructor() {
		window.addEventListener('online', () => {
			this.close()
		})
		window.addEventListener('offline', () => {
			this.close()
		})
	}

	/**
	 * 创建一个 socket 连接
	 * @param {string?} accessToken token
	 * @returns {boolean} true: 允许连接, false: 不允许连接
	 */
	createSocket(accessToken?: string): boolean {
		// 如果正在连接中或已经连上了, 无需再连
		if (this.sockets && [0, 1].includes(this.sockets.readyState)) {
			console.warn(`因为 readyState = ${this.sockets.readyState} 而取消连接`)
			return false
		}

		// 是否允许连接
		if (!this.isConnect()) {
			console.warn('因不满足重连条件而取消连接')
			return false
		}

		if (!accessToken) accessToken = cookies.get(tokenKey.access)

		const p = location.protocol
		const protocol = p === 'https:' ? 'wss' : p === 'file:' ? 'wss' : 'ws'

		const host = ajaxUrl('ws')

		const url = `${protocol}://${host}/${protocol}?accessToken=${accessToken}`
		this.sockets = new WebSocket(url)

		this.event.add('connect', () => {
			this.ready.value = true
			this.reconnectCount.value = 0
		})
		this.event.add('disconnect', () => {
			this.ready.value = false
		})

		setTimeout(() => {
			if (this.sockets?.readyState === 1) return

			// 断开连接进入重连, 这里无需写重连, 引开断开后会自动重连
			this.sockets?.close()
		}, 8000)

		return true
	}

	// 是否允许连接 socket; tru: 允许连接, false: 不允许连接
	isConnect(): boolean {
		const refreshToken = cookies.get(tokenKey.refresh)
		if (!refreshToken) {
			console.warn('无需连接, 用户尚未登录')
			return false
		}

		// 验证 token
		const token = cookies.get(tokenKey.access)
		if (!token) {
			console.warn('没有 accessToken 无法连接')
			// 延迟一定时间后重试
			socketAbnormal(this)

			// 换取新的 token
			store.dispatch('user/exchangeForNewToken')
			return false
		}

		// 验证无需连接 socket 的页面
		const notPages: string[] = []
		const path = location.hash.replace('#', '')
		if (notPages.includes(path)) {
			console.warn('当前在无需连接的页面而取消连接')
			return false
		}

		return true
	}

	// 关闭 webSocket 连接
	close() {
		if (this.sockets) {
			if (this.sockets.readyState === 1) {
				this.ready.value = false
				this.sockets.close()
			}
		}
	}

	// 心跳
	initHeartbeat() {
		if (this.heartbeatTimeObj) clearInterval(this.heartbeatTimeObj)

		this.heartbeatTimeObj = setInterval(() => {
			if (this.sockets?.readyState !== 1) return

			const token = cookies.get(tokenKey.access)
			if (!token) return

			this.send('heartBeat', { accessToken: token })
		}, this.heartbeatTime * 1000)
	}

	// 发送消息
	send(name: string, data: any = {}): void {
		if (typeof data === 'undefined') throw new Error('不能发送空数据')

		data.msgType = name
		data.userName = store.state.user.userInfo.userName

		const sendData = JSON.stringify(data)

		if (this.sockets) {
			const readyState = this.sockets.readyState
			if (readyState === 1) this.sockets.send(sendData)
			else this.sendPools.push({ name: name, data: sendData })

			// 异常状态, 开始进行重连
			if (![0, 1].includes(readyState)) this.reconnect()
		} else {
			this.reconnect()
		}
	}

	// 重连
	reconnect() {
		this.close()
		this.startConnect()
	}
}
