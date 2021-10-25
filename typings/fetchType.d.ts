import { AxiosRequestConfig } from 'axios'
import { AjaxConfig } from 'rxjs/ajax'

declare global {
	namespace Fetch {
		export interface config {
			token?: boolean // 是否验证 accessToken
			tokenCarry?: boolean // header 头是否携带 accessToken, true: 携带, false: 不携带
			// 要排除的类型, 如: [''] 当参数的值为 '' 时,将被过滤(即删除此字段)
			// 当次此段传入对象类型时,将根据参数的 key 进行匹配
			exclude?: false | any[] | Record<string, any[]>
			file?: boolean // 是否上传文件
			isCode?: boolean // 当 code 异常时是否在控制台抛出错误, 默认 true
			codeErrorMessage?: boolean // code 异常时是否显示警告弹框
			storePath: StorePath // 接口结果存储的路径
			cacheCb?: Function // 缓存数据, 读取到缓存数据, 将数据回调给此函数
		}

		export type all = AjaxConfig & config
		// export type all = AxiosRequestConfig & config

		// 接口结果存储的路径
		type StorePath =
			| string
			| false
			| {
					[key: string]:
						| string
						| {
								path: string
								handler: (val: any) => any
						  }
			  }
	}
}
