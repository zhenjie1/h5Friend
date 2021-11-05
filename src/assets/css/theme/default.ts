/**
 * # 重要
 * 如果需要使用 #ff0000 这种格式的颜色值, 请改为 rgb|rgba(255, 255, 255) 的格式
 * 因为 tailwind.config.js 在转换透明度时, 是将 rgb(255, 255, 255) 转换为 rgba(255, 255, 255, 10) 的格式
 * 如果使用16进制的格式, tailwind.config.js 将无法转换透明度
 */
const data: Data = {
	/* rgb 主背景颜色 */
	CR: '255',
	CG: '255',
	CB: '255',

	/* 与主背景颜色相反的颜色 */
	RR: '0',
	RG: '0',
	RB: '0',
	main: 'rgb(24, 144, 255)',
	AppLeftMenuColor: 'var(--R86)' /* 左侧菜单背景颜色 */,
	menuBgColor: 'transparent' /* 菜单颜色 */,
	bg: {
		/* 背景颜色 */
		color: 'var(--C0)' /* 背景颜色 */,
		hover: 'var(--R4)' /* 鼠标经过时的颜色 */,
		check: 'var(--R8)' /* 选中时的颜色 */,
		mask: 'var(--C96)' /* 遮罩层的背景颜色 dialog、select 等 */,
	},
	text: {
		/** 文字颜色 */
		color: 'var(--R80)',
		light: 'var(--R30)' /* 浅灰 */,
		gray: 'var(--R40)' /* 中等 */,
		grayDeep: 'var(--R60)' /* 深灰 */,
	},
	border: {
		color: 'var(--R10)',
		deep: 'var(--R20)',
	},
	shadow: '0 2px 10px var(--R10)',
}
export default data
