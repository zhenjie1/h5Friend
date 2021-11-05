import ajaxUrl from '@/utils/fetch/url'

export type State = {
	userInfo: User.state
	authBeforeHref: string // 前往授权之前的地址
}

const state: State = {
	userInfo: {} as User.state,
	authBeforeHref: ajaxUrl('ajax'),
}

export default state
