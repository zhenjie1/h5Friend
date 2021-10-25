import debounce from 'lodash/debounce'

/**
 * 创建 MutationObserver 对象及其回调
 *
 * @param {Function} cb 回调
 * @returns {MutationObserver} 监听对象
 */
function createMutationObserverObject(cb: (...args: any) => any) {
	const MutationObserver = window.MutationObserver

	return new MutationObserver(function (mutations) {
		// mutations.forEach(function (mutation) {
		cb && cb()
		// })
	})
}

const elObserver = new WeakMap()

/**
 * 监听变化
 *
 * @param {HTMLElement} el 要监听的 html 元素
 * @param {Function} callback 回调
 * @returns {void}
 */
export default function domObserver(el: Element, callback: (...args: any) => any) {
	if (!el || typeof callback !== 'function') throw new Error('监听失败')
	if (elObserver.has(el)) return
	callback()

	const observer = createMutationObserverObject(callback)
	observer.observe(el, {
		childList: true, // 观察目标子节点的变化，添加或者删除
		attributes: true, // 观察属性变动
		subtree: true, // 默认为 false，设置为 true 可以观察后代节点
	})

	const fn = debounce(callback, 200)
	window.addEventListener('resize', fn)

	elObserver.set(el, { el, observer, fn })
}

/**
 * 停止对一个元素监听
 *
 * @param {HTMLElement} el 创建监听对象时 监听的 html 元素
 * @returns {void}
 */
export function stopDomObserver(el?: Element) {
	if (!el) return
	const saveObserver = elObserver.get(el)

	if (!saveObserver) return
	const { observer, fn } = saveObserver
	// 停止监听
	observer.disconnect()

	// 删除存储的对象
	elObserver.delete(el)

	// 移除对 window resize 的监听
	window.removeEventListener('resize', fn)
}
