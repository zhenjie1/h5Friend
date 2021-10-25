import { Directive } from 'vue'

interface Width {
	minWidth: number
	maxWidth: number
}
interface Height {
	minHeight: number
	maxHeight: number
}

type Args = Width | Height

/**
 * 指令内容
 *
 * @returns {Directive} 返回 vue 标准的指令配置
 */
export default function directiveSize(): Directive {
	return {
		mounted(el: HTMLElement, binding) {
			if (typeof binding.value !== 'object') throw new Error('缺少必要参数!')

			if (!binding.value) throw new Error('请传入可拖动的元素css选择器!')

			const posEl: HTMLElement = el.querySelector(binding.value.drop)
			if (!posEl) throw new Error('未找到可拖动的元素css选择器!')
			hoverStyle(posEl, binding.value)

			// eslint-disable-next-line no-new
			new AdjustSize({
				parentEl: el,
				dropEl: posEl,
				args: binding.value,
			})
		},
	}
}

/**
 * 鼠标经过提示样式
 *
 * @param {Element} el 目标元素
 * @param {Args} args 参数
 * @returns {void}
 */
function hoverStyle(el: HTMLElement, args: Args) {
	const clas = Array.from(el.classList)[0]
	if (!clas) return

	let direction = ''
	if ('minWidth' in args || 'maxWidth' in args) direction = 'width'
	else if ('minHeight' in args || 'maxHeight' in args) direction = 'height'
	if (!direction) {
		const { offsetWidth: width, offsetHeight: height } = el
		direction = width > height ? 'height' : 'width'
	}

	// 无法识别是 width 还是 height
	if (!direction) return

	// 组装css
	{
		const isWidth = direction === 'width'
		const size = isWidth ? 'width: 1px;height: 100%;' : 'width: 100%;height: 1px;'
		const position = isWidth ? 'top: 0;left: 50%;' : 'top: 50%;left: 0;'
		const border = isWidth ? 'left' : 'top'
		const style = `content: '';display:none;position: absolute;${size}${position}border-${border}:1px dashed var(--main);`
		const s = style.split(';').map((v) => v.split(':').map((v) => v.trim()))
		s.pop()

		const borderEl = document.createElement('span')
		borderEl.classList.add('viewBorder')
		s.map((v) => {
			if (v.length !== 2) return
			const [sty, val] = v
			const style: any = borderEl.style
			style[sty] = val
		})
		el.append(borderEl)
	}

	// 设置鼠标经过效果
	{
		const styleLink = document.createElement('style')
		styleLink.setAttribute('type', 'text/css')
		styleLink.classList.add('borderDropStyle')
		styleLink.innerHTML = `.${clas}:hover .viewBorder{display:block !important;}`
		document.head.append(styleLink)
	}
}

interface Data {
	down: {
		left: number
		top: number
	}
}

// export interface directiveSize
export type DirectiveSizeOptions = {
	drop: string
} & Args

interface AdjustSizeParams {
	parentEl: HTMLElement
	dropEl: HTMLElement
	args: Args
}

class AdjustSize {
	parentEl: HTMLElement | undefined // 绑定元素的节点
	parentWidth: number // 绑定时节点的宽度
	parentHeight: number // 绑定时节点的高度

	dropEl: HTMLElement | undefined // 拖动元素

	args: Args // 传入的参数

	data: Data // 内部的数据

	constructor(params: AdjustSizeParams) {
		this.parentEl = params.parentEl
		this.parentWidth = 0
		this.parentHeight = 0
		this.dropEl = params.dropEl
		this.args = params.args

		this.data = {
			down: {
				left: 0,
				top: 0,
			},
		}

		if (this.dropEl) {
			this.dropEl.addEventListener('mousedown', () => this.down.call(this))
		}
	}

	// 鼠标按下时执行
	down() {
		if (!this.parentEl) throw new Error('没有找到父级 Element')

		const { width, height } = this.parentEl.getBoundingClientRect()
		this.parentWidth = width
		this.parentHeight = height

		const style = this.parentEl.getBoundingClientRect()

		this.data.down.left = style.right
		this.data.down.top = style.top

		document.body.style.userSelect = 'none'

		document.addEventListener('mousemove', this.move)
		document.addEventListener('mouseup', this.up)
	}

	setParentSize(type: string, value: number) {
		if (!this.parentEl) return

		if (type === 'width' && 'minWidth' in this.args) {
			const { minWidth, maxWidth } = this.args
			const v = value < minWidth ? minWidth : value > maxWidth ? maxWidth : value
			this.parentEl.style[type] = v + 'px'
		} else if (type === 'height' && 'minHeight' in this.args) {
			const { minHeight, maxHeight } = this.args
			const v = value < minHeight ? minHeight : value > maxHeight ? maxHeight : value
			this.parentEl.style[type] = v + 'px'
		}
	}

	// 鼠标移动中执行
	move = (e: MouseEvent) => {
		if (!this.parentEl) return

		const { clientX: x, clientY: y } = e

		if ('minHeight' in this.args) {
			const hCalc = y - this.data.down.top
			const height = this.parentHeight - hCalc
			this.setParentSize('height', height)
		}

		if ('minWidth' in this.args) {
			const wCalc = x - this.data.down.left
			const width = this.parentWidth + wCalc
			this.setParentSize('width', width)
		}
	}

	// 鼠标 移出窗口 或 抬起 时执行
	up = () => {
		document.removeEventListener('mousemove', this.move)
		document.removeEventListener('mouseup', this.up)
		document.body.style.userSelect = ''
	}
}
