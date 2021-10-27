import defaultTheme from '@/assets/css/theme/default'
import blackTheme from '@/assets/css/theme/black'
import { firstToUpper } from '@/utils'

type AllTransformColor = {
	name: string
	color: string
}[]

// 判断是不是 rgb 颜色格式
const isRgb = (rgb: string) => /^(rgb)a?/.test(rgb)

// 添加主题颜色
export function appentTheme() {
	const theme = defaultTheme
	const bodyDeclaration = getComputedStyle(document.body)

	// 循环生成透明度
	const themeColor = ['main'] // 主题颜色转换
	const constColor = ['red', 'yellow', 'blue'] // color.scss 文件中定义的颜色

	let styleColor = ''
	for (const i in theme) {
		if (['bg', 'text', 'border'].includes(i)) {
			for (const j in theme[i]) {
				const item = theme[i][j]
				const name = i + firstToUpper(j)
				styleColor += `--${name}: ${item};\n`
			}
		} else {
			styleColor += `--${i}: ${theme[i]};\n`
		}
	}

	// 所有要转换透明色的颜色
	const allTransformColor = [...themeColor, ...constColor].reduce<AllTransformColor>(
		(total, key, index) => {
			const isTheme = index < themeColor.length
			let rgb = isTheme ? theme[key] : bodyDeclaration.getPropertyValue(`--${key}`)
			rgb = rgb.replace(/ /g, '')

			if (!isRgb(rgb)) {
				console.log(isTheme ? '主题颜色' : '常量颜色', `${key} 不是 rgb 格式 ${rgb}`)
				return total
			}
			total.push({ name: key, color: rgb })
			return total
		},
		[]
	)

	const allColors = allTransformColor.reduce((total, item) => {
		const [r, g, b] = item.color.replace(/rgba?\(([^\)]+).+/, '$1').split(',')
		for (let i = 1; i < 50; i++) {
			total += `--${item.name}-${i * 2}: rgba(${r}, ${g}, ${b}, ${(i * 2) / 100});\n`
		}

		return total
	}, '')

	styleColor += `\n${allColors}` // 拼接透明颜色
	styleColor = `body{\n${styleColor}\n}`

	const themeStyle = document.createElement('style')
	themeStyle.setAttribute('type', 'text/css')
	themeStyle.classList.add('themeColorConfig')
	themeStyle.innerHTML = styleColor
	document.head.append(themeStyle)
}
