import APIFetch from 'utils/fetch'
import store from '@/store/index'

// 获取图形码
export const getImageCode = () =>
	APIFetch({
		url: '/secret.graphcode.get',
		method: 'get',
		token: false,
		dataPath: 'data.data',
		storePath: 'login.codeImg',
	})

export type LoginReturn = {
	accessToken: string
	permissionList: string
	refreshToken: string
	userInfo: User.state
}
// 登录接口
export const startLogin = (data: any) =>
	APIFetch<LoginReturn>({
		url: '/product.user.login',
		data,
		dataPath: 'data.data',
		token: false,
		storePath: {
			accessToken: 'login.login.accessToken',
			refreshToken: 'login.login.refreshToken',
			permissionList: {
				path: 'login.login.permissionList',
				handler: (list: string) => list.split(','),
			},
			userInfo: 'login.login.userInfo',
		},
		isCode: false,
	}).then((res) => {
		store.commit('user/changeAccessToken', res.accessToken)
		store.commit('user/changeRefreshToken', res.refreshToken)
		store.commit('user/changeUserInfo', res.userInfo)
		return res
	})
