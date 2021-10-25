/**
 * 向指定节点内插入节点
 *
 * @param {HTMLElement} parentNode dom Node
 * @param {Node[]} insertDoms 要插入的Dom
 * @param {number} offset [可选] 指定插入的位置
 */
export function insertDom(parentNode: HTMLElement, insertDoms: Node[], offset = 0) {
	const selection = getSelection()

	const range = selection?.getRangeAt(0)
	if (!range) return

	const { endContainer, endOffset } = range

	offset = offset || endOffset

	const { childNodes: parentChildNodes } = parentNode

	// 如果没有字节点, 直接将元素插入
	if (!parentChildNodes || parentChildNodes.length === 0) {
		insertDoms.map((node) => parentNode.appendChild(node))
	} else {
		const prevs: Node[] = [] // endContainer 之前的节点
		const nexts: Node[] = [] // endContainer 之后的节点
		let isFind = false // 是否已找到了

		Array.from(parentChildNodes).map((node) => {
			if (node === endContainer) return (isFind = true)
			const source = isFind ? nexts : prevs
			source.push(node)
		})

		parentNode.innerHTML = ''

		const first = endContainer.nodeValue?.substr(0, offset)
		const last = endContainer.nodeValue?.substr(offset)
		const TPrev = document.createTextNode(first ?? '')
		const TNext = document.createTextNode(last ?? '')

		const fillChildNodes = [...prevs, ...[TPrev, ...insertDoms, TNext], ...nexts]

		fillChildNodes.map((node) => {
			parentNode.appendChild(node)
		})
	}
}
