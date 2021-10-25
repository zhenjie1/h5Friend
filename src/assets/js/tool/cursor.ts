/**
 * 获取光标位置
 *
 * @param {HTMLInputElement | HTMLTextAreaElement | HTMLElement} el 要获取光标位置的dom
 * @returns {number} 返回位置索引
 */
export function getCursorPosition(el?: HTMLInputElement | HTMLTextAreaElement | HTMLElement) {
	if (el) {
		const tagName = el.tagName.toLocaleLowerCase()
		if (['input', 'textarea'].includes(tagName) && 'selectionStart' in el) {
			return el.selectionStart || 0
		}
	}

	if (!window.getSelection || !window.getSelection()) return 0

	const rang = window.getSelection()!.getRangeAt(0)

	return rang.endOffset
}

/**
 * 使指定节点获取光标
 *
 * @param {Node} node 要获取光标的节点
 * @param {number} offset 光标偏移量
 * @returns {void}
 */
export function setCursorNode(node: Node, offset = 0) {
	const range = document.createRange()

	range.selectNodeContents(node)
	range.setStart(node, offset)
	range.collapse(true)

	const s = getSelection()
	s?.removeAllRanges()
	s?.addRange(range)
}
