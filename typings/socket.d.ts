// import { App } from 'vue'
export {}
declare global {
	namespace Socket {
		type options = {
			immediate: boolean
			handler: Function
			component?: Record<string, any>
		}

		type stateOption = {
			[key: string]: options[]
		}
	}
}
