import { ApiData } from '@/api/store'
import SocketListener from '@/plugins/socket/socket'
import { UseStore } from '@/store/type'

export {}
declare global {
	type Data<T = any> = {
		[key: string]: T
	}
	interface Window {
		JSEncrypt: any
		pako: any
		store: UseStore

		socketObj: SocketListener
		apiData: ApiData
	}
}
