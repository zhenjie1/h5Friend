import { Directive } from 'vue'

interface Keyword {
	change: boolean
	key: string[]
}

// 将传入的配置都保存起来
// [key: HTMLInput]: Object<Keyword>
const configSave = new Map<HTMLElement, Keyword>()

/**
 * 绑定快捷键指令
 *
 * @returns {Directive} 返回指令配置
 */
export default function keyword(): Directive {
	return {
		mounted(el: HTMLElement, binding) {
			const isInput = el instanceof HTMLInputElement
			let inputEl = el
			if (!isInput) inputEl = el.getElementsByTagName('input')[0]

			if (!inputEl) throw new Error('没有找到 input')
			if (typeof binding.value !== 'object') throw new Error('确实必要参数')

			configSave.set(inputEl, binding.value)

			inputEl.addEventListener('keydown', keydown, false)
			inputEl.addEventListener('keyup', keyup, false)
		},
		beforeUnmount() {},
	}
}

// 方向键
const directionKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
const onlyLetters = [
	...'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split(''),
	...'0123456789'.split(''),
]
// 确定键
const confirmKeys = [
	...directionKeys,
	'Enter',
	'Backspace',
	...'-_=+[]{}\\|:;",<\'.>/?'.split(''),
	...onlyLetters,
]
// 开始键
const startKeys = ['Shift', 'Control', 'Alt', 'Meta', 'Enter', 'Backspace', 'Tab']

/**
 * 键盘按下
 *
 * @param {KeyboardEvent} e 事件对象
 * @returns {void}
 */
function keydown(e: KeyboardEvent) {
	e.preventDefault()
	if (!e.key) return

	const inputEl = e.target as HTMLElement
	const config = configSave.get(inputEl)
	if (!config) return console.error('没有找到相关配置!')
	if (!config.change) {
		config.change = true
		config.key.length = 0
	}

	const key = e.key.length === 1 ? e.key.toUpperCase() : e.key
	const len = config.key.length

	// 如果第一次按下的不是开始键
	if (len === 0 && !startKeys.includes(key)) {
		return console.log('别瞎按')
	}
	config.key.push(key)

	// 完成设置
	if (config.key.length > 1 && confirmKeys.includes(key)) {
		config.change = false
		inputEl.blur()
	}
}

/**
 * 键盘抬起
 *
 * @param {KeyboardEvent} e 事件对象
 * @returns {void}
 */
function keyup(e: KeyboardEvent) {
	e.preventDefault()
	if (!e.key) return

	const inputEl = e.target as HTMLElement
	const config = configSave.get(inputEl)
	if (!config) return console.error('没有找到相关配置!')
	if (!config.change) return

	const key = e.key.length === 1 ? e.key.toUpperCase() : e.key

	const index = config.key.findIndex((k) => k === key)
	if (index !== -1) {
		config.key.splice(index, 1)
	}
}
