export {}

declare global {
	type Data<T = any> = {
		[key: string]: T
	}
	interface Window {
		AMap: any
		WeixinJSBridge: any
	}
}
