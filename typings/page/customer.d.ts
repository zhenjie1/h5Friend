export interface CustomerItem {
	id: number
	label: string
	userId: number
	userName: string
	deptId: number
	deptName: string
	parentId: number
	companyId: number
	phone: string | null
	position: User.position
	limitWx: number
	status: number
	salesUserId: number
	email: string | null
	onlineTotal: number | null
	onlineUins: number[] | null
	onLineWxContactTotal: number | null
	createDate: string
	lastLoginTime: string
	children: any[] | null
	users: any[] | null
	brand: User.brandType
}
