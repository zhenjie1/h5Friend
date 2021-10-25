export type State = {
	accessToken: string
	refreshToken: string
	userInfo: User.state
}

const state: State = {
	accessToken: '',
	refreshToken: '',
	userInfo: {} as User.state,
}

export default state
