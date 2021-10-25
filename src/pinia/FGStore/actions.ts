import { State } from './state'
import { UnwrapRef } from 'vue-demi'
import { StoreWithState, StoreWithGetters, PiniaCustomProperties } from 'pinia'

type Actions = {
	saveCheckedFriend: (this: ThisActionsType, friend?: FriendItem) => any
}

const actions: Actions = {
	// 首页, 保存选中的好友
	saveCheckedFriend(friend) {
		this.checkedFriend = friend
	},
}

export default actions

type ThisActionsType = UnwrapRef<State> &
	Actions &
	StoreWithState<'fg', State, Actions, {}> &
	StoreWithGetters<Actions> &
	PiniaCustomProperties
