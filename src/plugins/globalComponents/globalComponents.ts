import { App, Component } from 'vue'

/**
 * 注册全局组件
 *
 * @param {App<Element>} app createApp的返回
 * @returns {void}
 */
export default function initGlobalComponent(app: App<Element>) {
	const modules = import.meta.globEager('./../../components/common/**/*.vue')
	for (const path in modules) {
		const mod = modules[path]
		const component: Component = mod.default
		if (!component || !component.name) return

		app.component(component.name, component)
	}
}
