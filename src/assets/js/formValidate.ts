interface Validator {
	(rule: { [key: string]: any }, value: string, cb: (...args: any[]) => {}): void
}

/**
 * 输入是否是10的倍数
 *
 * @param {object} rule 配置参数
 * @param {string} value 要验证的值
 * @param {Function} cb 验证回调
 *
 * @returns {void}
 */
export const validatorMultiple10: Validator = (rule, value, cb) => {
	if (value === '0') return cb(new Error('不能输入0'))
	if (!value || parseInt(value) % 10 !== 0) return cb(new Error('只能是10的倍数'))

	cb()
}

/**
 * 验证只能输入数字
 * @param {object} rule 配置参数
 * @param {string} value 要验证的值
 * @param {Function} cb 验证回调
 * @returns  {void}
 */
export const validatorNumber: Validator = (rule, value, cb) => {
	if (value === '') return cb(new Error('不能为空'))
	if (/^[0+]/.test(value)) return cb(new Error('开头不能是 “0” 或 “+”'))
	if (/^\-/.test(value)) return cb(new Error('只能输入正整数'))
	if (/\./.test(value)) return cb(new Error('只能输入正整数'))
	if (/^[0-9]+$/.test(value)) return cb()
	cb(new Error('只能是数字'))
}

/**
 * 验证输入的值是否在允许范围内
 * @param {object} rule 配置参数
 * @param {string} value 要验证的值
 * @param {Function} cb 验证回调
 * @returns  {void}
 */
export const validatorNumberRange: Validator = (rule = {}, value, cb) => {
	if (!rule.required && value === '') return cb()

	if (/^[0+]/.test(value)) return cb(new Error('开头不能是 “0” 或 “+”'))
	if (/^[0-9]+$/.test(value)) {
		const { min, minMsg, max, maxMsg } = rule
		if (typeof max === 'number' && parseInt(value) > max) {
			return cb(new Error(maxMsg || `不能大于 ${max}`))
		}
		if (typeof min === 'number' && parseInt(value) < min) {
			return cb(new Error(minMsg || `不能小于 ${min}`))
		}
		return cb()
	}
	cb(new Error('只能是数字'))
}

/**
 * 校验 密码【限制 长度为6-16位的数字和字母混合组成】 /[^\w\.\/]/ig
 *
 * @param {object} rule 配置参数
 * @param {string} value 要验证的值
 * @param {Function} callback 验证回调
 *
 * @returns {void}
 */
export const validatorPassword: Validator = (rule, value, callback) => {
	if (!rule.required && value === '') return callback()
	const { msg = '' } = rule
	const length = /^[a-z0-9]{6,16}$/i.test(value)
	const lengthMsg = msg + '长度必须在 6-16 位'

	// 纯数字
	const allNumber = /^[0-9]*$/.test(value)
	if (allNumber) return length ? callback() : callback(new Error(lengthMsg))

	// 纯字母
	const allLetter = /^[a-z]*$/i.test(value)
	if (allLetter) return length ? callback() : callback(new Error(lengthMsg))

	// 以下判断字母加数字混合的情况

	// 字母开头
	if (/^[^a-z]/i.test(value)) return callback(new Error(msg + '只能是字母开头'))

	if (/[^a-z0-9]$/i.test(value)) return callback(new Error(msg + '不能包含特殊符号'))

	if (!length) return callback(new Error(msg + '长度必须在 6-16 位'))

	callback()
}

/**
 * 校验 用户名
 *
 * @param {object} rule 配置参数
 * @param {string} value 要验证的值
 * @param {Function} callback 验证回调
 *
 * @returns {void}
 */
export const validatorUsername: Validator = (rule, value, callback) => {
	if (!value) return callback(new Error('用户名不能为空'))

	const letterFirst = /^[^a-zA-Z]/.test(value)
	if (letterFirst) return callback(new Error('只能是字母开头'))

	const notLetter = !/^[a-zA-Z0-9]+$/.test(value)
	if (notLetter) return callback(new Error('仅限【纯字母】或【字母+数字】'))

	const size = !/^[\w]{6,16}$/.test(value)
	if (size) return callback(new Error('用户名必须是 6-16 位'))

	callback()
}
