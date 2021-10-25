import * as friend from '@/store/modules/friend'
import * as group from '@/store/modules/group'
import * as user from '@/store/modules/user'
import * as wechat from '@/store/modules/wechat'
import * as fg from '@/store/modules/FGStore'

export * from './Root'
export * from './Actions'
export * from './Store'

export type Modules = {
	friend: [friend.State, friend.Actions, friend.Mutations, friend.Getters]
	group: [group.State, group.Actions, group.Mutations, group.Getters]
	user: [user.State, user.Actions, user.Mutations, user.Getters]
	wechat: [wechat.State, wechat.Actions, wechat.Mutations, wechat.Getters]
	fg: [fg.State, fg.Actions, fg.Mutations, fg.Getters]
}
