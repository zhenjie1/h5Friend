import * as login from './login'
import * as chat from './chat'
import * as user from './user'
import * as friend from './friend'
import * as group from './group'
import * as conver from './conversation'
import * as keyword from './keyword'
import * as wechatList from './pageWechatList'
import * as wechatGroup from './wechatGroup'
import * as customer from './customer'
import * as hello from './hello'

export * from './wechatGroup'
export * from './hello'

export const api = {
	login,
	chat,
	user,
	friend,
	group,
	keyword,
	conver,
	hello,
	customer,
	wechatList,
	wechatGroup,
}
