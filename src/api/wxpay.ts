import APIFetch from 'utils/fetch'
import { Toast } from 'vant'

// 下单
export const transactions = () =>
	APIFetch(
		{
			url: '/api/test/index',
		},
		'data.data'
	)

declare let WeixinJSBridge: any

// 开始支付
export const startPay = (payOptions: Data, tip = false): Promise<any> => {
	const res = payOptions
	const options = {
		appId: res.appId,
		timeStamp: res.timestamp,
		nonceStr: res.nonceStr,
		package: res.package,
		signType: res.signType,
		paySign: res.paySign,
	}

	const p = new Promise<Data>((resolve, reject) => {
		WeixinJSBridge.invoke('getBrandWCPayRequest', options, function (res: Data) {
			if (res.err_msg == 'get_brand_wcpay_request:ok') {
				tip && Toast.success('支付成功')
				resolve({
					code: 1,
					msg: '支付成功',
				})
			} else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
				tip && Toast.fail('取消支付')
				reject({
					code: 0,
					msg: '取消支付',
				})
			} else {
				tip && Toast.fail('支付失败')
				reject({
					code: 0,
					msg: '支付失败',
				})
			}
		})
	})
	return p
}
