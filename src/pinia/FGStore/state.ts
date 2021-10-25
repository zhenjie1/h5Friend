import { StateTree } from 'pinia'

export interface State extends StateTree {
	checkedFriend?: FriendItem
}

const state: State = {
	checkedFriend: undefined,
}

export default state
