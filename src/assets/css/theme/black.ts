const data: Data = {
	/* rgb 主背景颜色 */
	CR: '0',
	CG: '0',
	CB: '0',

	/* 与主背景颜色相反的颜色 */
	RR: '255',
	RG: '255',
	RB: '255',

	main: 'rgb(40, 8, 255)',
	AppLeftMenuColor: 'var(--C40)' /* 左侧菜单背景颜色 */,
	menuBgColor: 'transparent' /* 菜单颜色 */,
	bg: {
		/* 背景颜色 */
		color: 'rgb(24, 24, 24)' /* 背景颜色 */,
		hover: 'var(--R4)' /* 鼠标经过时的颜色 */,
		check: 'var(--R8)' /* 选中时的颜色 */,
		mask: 'var(--R10)' /* 遮罩层的背景颜色 dialog、select 等 */,
	},
	text: {
		/** 文字颜色 */
		color: 'var(--R80)',
		light: 'var(--R30)' /* 浅灰 */,
		gray: 'var(--R50)' /* 中等 */,
		grayDeep: 'var(--R60)' /* 深灰 */,
	},
	border: {
		color: 'var(--R10)',
		deep: 'var(--R20)',
	},
	shadow: '0 2px 15px var(--R6)',
}

export default data
export const style = {
	backgroundColor: '',
}
