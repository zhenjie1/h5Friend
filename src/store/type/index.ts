import * as user from '@/store/modules/user'

export * from './Root'
export * from './Actions'
export * from './Store'

export type Modules = {
	user: [user.State, user.Actions, user.Mutations, user.Getters]
}
