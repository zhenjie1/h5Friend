import { PropType } from 'vue'

// 选中的微信号验证
export const wechatProp = {
	type: Object as PropType<Wechat.data | undefined>,
	validator(value: Wechat.data) {
		if (value === undefined) return true
		return value && !!value.wxId && !!value.uin
	},
}
