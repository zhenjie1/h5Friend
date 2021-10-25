declare module '*.vue' {
	import { ComponentOptions } from 'vue'
	const componentOptions: ComponentOptions
	export default componentOptions
}

// // declare global {
// declare module '@vue/runtime-core' {
// 	export interface ComponentCustomProperties {
// 		$http: string
// 		$validate: (data: object, rule: object) => boolean
// 	}
// }
// // }
