// 将接口返回的数据统统放到这里
// 想此处的数据更新, 页面数据跟着变化

import { CustomerItem } from 'typings/page/customer'
import { reactive } from 'vue'
import { LoginReturn } from './login'

export type ApiData = {
	login: {
		login: LoginReturn
		codeImg: {
			codeKey: string
			img: string
		}
	}
	chat: {
		wxList: {
			children: Wechat.data[]
			groupId: number
			groupName: string
			id: number
		}[]
	}
	wechatList: {
		list: {}
	}
	wechatGroup: {
		all: any[]
		list: any[]
	}
	customer: {
		subordinate: CustomerItem[]
	}
	hello: {
		list: any[]
	}
}

const loginPage = {
	login: {},
	codeImg: {
		codeKey: '',
		img: '',
	},
}

const chatPage = {
	wxList: [],
}

const apiData: ApiData = reactive({
	login: loginPage,
	chat: chatPage,
	// 微信分组
	wechatGroup: {
		// 全部分组
		all: [],
		// 分组内容
		list: [],
	},
	wechatList: {
		list: [],
	},
	// 客服
	customer: {
		// 获取当前账户的下级客服 (含当前用户)
		subordinate: [],
	},
	// 欢迎语
	hello: {
		list: [],
	},
	// 关键字
	keyword: {
		// 列表内容
		list: [],
	},
})

window.apiData = apiData

export default apiData
