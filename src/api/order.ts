import APIFetch from 'utils/fetch'
import { startPay } from './wxpay'

// 微信授权 - 获取code
export const orderPay = (order_no: string) =>
	APIFetch(
		{
			url: '/api/order/pay',
			data: { order_no },
		},
		'data.data'
	)

// 根据订单支付
export const orderPayStart = (order_no: string) =>
	orderPay(order_no).then((res: Data) => startPay(res, true))
