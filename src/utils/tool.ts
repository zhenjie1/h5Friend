import { curry, isObject } from 'lodash'
import dayjs from 'dayjs'
import { unref, Ref, ref, onMounted } from 'vue'
import { MaybeRef, templateRef } from '@vueuse/core'
import { GetFieldType } from 'typings/utils'

// 检查类型
const typeCheck = curry((type: any, val: any) => {
	return val.constructor === type
})

// type Unrefs = {}
type Unrefs<T = any> = {
	[key: string]: MaybeRef<T>
}
// ref 对象转普通对象
export function unrefs<T>(refs: Unrefs): T {
	for (const i in refs) {
		refs[i] = unref(refs[i])
	}
	return refs as T
}

// 获取 ref
export function getRef(refStr: string | Element): Ref<Element | undefined> {
	const el: Ref<Element | undefined> = ref()
	if (refStr instanceof Element) el.value = refStr
	else {
		onMounted(() => {
			const target = templateRef(refStr)
			if (target.value) el.value = target.value
			else console.error('未找到', refStr)
		})
	}
	return el
}

/**
 * 判断是不是开发环境
 *
 * @returns {boolean} 返回是不是开发环境
 */
export const isDev = process.env.NODE_ENV === 'development'

// 是不是空对象
export const isEmptyObj = (obj: Object): boolean =>
	isObject(obj) ? Object.keys(obj).length === 0 : false

// 是否是 FormData 类型
export const isFormData = (val: any): val is FormData => typeCheck(FormData)(val)

// 是不是不存在的值
export const isEmpty = (val: any) => [null, undefined].includes(val)

// json 转换
export function JSONToStr(obj: object) {
	return JSON.parse(JSON.stringify(obj))
}

// string 转 json 对象
export function strToJson(str: any): Record<string, any> {
	if (typeof str !== 'string') return str

	try {
		return JSON.parse(str)
	} catch {
		return str as any as Record<string, any>
	}
}

// string | object 深度转为 object 对象
export function strToJsonDeep(val: Record<string, any> | string): any {
	if (!isObject(val)) return strToJson(val)

	for (const i in val) {
		const item = val[i]
		if (i === 'uin') val[i] = parseInt(item)
		else if (isObject(item)) strToJsonDeep(item)
		else if (typeof item === 'string') val[i] = strToJson(item)
	}
	return val
}

/**
 * 首字母大写
 * @param {string} str string
 * @returns {string} 转换后的结果
 */
export function firstToUpper(str: string | undefined) {
	if (!str) return ''
	return str.trim().replace(str[0], str[0].toUpperCase())
}

/**
 * 创建一个 script 脚本
 * 会自动检查是否已经注入过相同的脚本了
 *
 * @param {string} url 要添加的脚本地址
 * @returns {Promise} 返回是否注入脚本成功
 */
export function addScript(url: string) {
	return new Promise((resolve, reject) => {
		const script = Array.from(document.getElementsByTagName('script'))
		const targetScript = script.find((el) => {
			const src = el.getAttribute('src')
			if (src === url) return true
			return false
		})

		// 已经引入过了
		if (targetScript) return resolve('')

		const scriptEl = document.createElement('script')
		scriptEl.src = url

		scriptEl.onload = function () {
			resolve('')
		}

		scriptEl.onerror = function (e) {
			console.error(e)
			debugger
			reject(e)
		}

		document.head.appendChild(scriptEl)
	})
}
/**
 * 节流函数，与传统截留不一样的是，可传入一个唯一标识
 *
 * @param {number} delay 延迟时间
 * @param {boolean} onceRun 第一次是否立即执行，默认只有到了规定时间才会执行
 * @returns {Function} 返回可执行的截流方法
 */
export function myThrottle(delay = 300, onceRun = false) {
	const keys = new Map()

	return function (key: string, fn: Function) {
		if (!key) throw new Error('缺少必要参数')
		if (typeof fn !== 'function') throw new Error('fn 必须为函数')

		const args = arguments

		let prevOptions = keys.get(key)

		if (!prevOptions) {
			const options = { avail: true, lastFn: fn, timer: undefined }
			keys.set(key, options)
			prevOptions = options
		}

		if (prevOptions.avail) {
			prevOptions.avail = false

			let isRun = false
			if (onceRun && !prevOptions.timer) {
				fn.apply(null, args)
				isRun = true
			}

			if (isRun) {
				prevOptions.timer = setTimeout(() => {}, 0)
				prevOptions.avail = true
			} else {
				prevOptions.timer = setTimeout(() => {
					fn.apply(null, args)
					prevOptions.avail = true
				}, delay)
			}
		}
	}
}
/**
 * 日期格式转换
 *
 * @param {string} date 要转换的字符串
 * @returns {string} 转换后的字符串
 */
export function dateTrans(date: dayjs.ConfigType, len = 20): string {
	if (!date) return ''
	const date1 = dayjs(date).format('YYYY-MM-DD HH:mm:ss')
	return date1.substr(0, len)
}

/**
 * 读取对象上的值
 *
 * @param {object} data 源数据
 * @param {string} path 路径
 * @param {any} defaultValue 不存在时的默认值
 * @returns {GetFieldType<TData, TPath> | TDefault} 返回
 */
export function getObjValue<TData, TPath extends string, TDefault = GetFieldType<TData, TPath>>(
	data: TData,
	path: TPath,
	defaultValue?: TDefault
): GetFieldType<TData, TPath> | TDefault {
	const value = path
		.split('.')
		.reduce<GetFieldType<TData, TPath>>((value, key) => (value as any)?.[key], data as any)

	return value !== undefined ? value : (defaultValue as TDefault)
}
