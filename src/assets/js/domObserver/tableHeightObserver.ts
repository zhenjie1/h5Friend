import domObserver, { stopDomObserver } from './domObserver'
import { onMounted, onUnmounted, ref } from 'vue'
import { getRef } from '@/utils'

/**
 * 页面表格高度监听
 * 注意， 使用此函数，内部 this 指针必须是 Vue 实例
 *
 * @param {HTMLElement} el 要监听的元素
 * @param {string} key 高度变化后，会给此值赋新高度
 * @param {number} offset 高度结果调整
 */
export default function tableHeightObserver(params: { el: string | Element; offset?: number }) {
	const { el, offset = 0 } = params
	if (!el) throw new Error('缺少必要参数！')

	const maxHeight = ref(1000)

	const result = { maxHeight }

	// 节点
	const otherElement = getRef(el)

	onMounted(() => {
		// 如果没有找的节点
		if (!otherElement.value) return result

		const otherNode = otherElement.value as Element
		// 对节点的内容进行监听
		domObserver(otherNode, () => {
			const height = otherNode.getBoundingClientRect().height
			maxHeight.value = innerHeight - height + offset
		})
	})

	onUnmounted(() => {
		stopDomObserver(otherElement.value)
	})

	return result
}
