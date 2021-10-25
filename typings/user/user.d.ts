export {}

declare global {
	namespace User {
		type position = 0 | 1 | 2 | 3

		type brandType = '0' | '1' | '2' | '3' | '4' | '5' | '8' | '9' | '10'

		type state = {
			// userInfo: {
			brand: number
			companyCode: string
			companyId: number
			companyName: string
			deptId: string
			deptTopLevel: number
			email: string
			invitationCode: string | null
			lastLoginTime: string
			limitWx: string
			phone: string | null
			position: position
			realName: string
			remark: string | null
			startDate: string
			status: number
			stopDate: string
			userId: number
			userName: string
			// }
		}
	}
}
