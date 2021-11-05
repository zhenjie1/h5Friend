<template>
	<div class="wxpay">
		<h3>微信支付</h3>
		<pre>{{ wxOptions }}</pre>
	</div>
</template>

<script lang="ts" setup>
import { api } from '@/api'
import { Ref, ref } from 'vue'
const wxOptions = ref({}) as Ref<Data>

declare let WeixinJSBridge: any

api.wxpay.transactions().then((res) => {
	wxOptions.value = res

	const options = {
		appId: wxOptions.value.appId,
		timeStamp: wxOptions.value.timestamp,
		nonceStr: wxOptions.value.nonceStr,
		package: wxOptions.value.package,
		signType: wxOptions.value.signType,
		paySign: wxOptions.value.paySign,
	}

	WeixinJSBridge.invoke('getBrandWCPayRequest', options, function (res: Data) {
		if (res.err_msg == 'get_brand_wcpay_request:ok') {
			// 使用以上方式判断前端返回,微信团队郑重提示：
			//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
		}
	})
})
</script>

<style lang="scss" scoped>
.wxpay {
}
</style>
