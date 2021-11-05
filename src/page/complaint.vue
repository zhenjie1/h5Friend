<template>
	<div class="wechatGroup">
		<van-form class="my-5" @submit="submit">
			<van-cell-group>
				<van-field
					v-model="form.content"
					label="投诉建议"
					required
					type="textarea"
					placeholder="请输入投诉建议"
					rows="3"
					autosize
					:rules="[{ required: true, message: '请填写投诉建议原因' }]"
				/>
			</van-cell-group>

			<van-button
				type="primary"
				:disabled="disabledSubmit"
				block
				class="submit"
				native-type="submit"
				:loading="loading"
			>
				确认
			</van-button>
		</van-form>
	</div>
</template>

<script lang="ts" setup>
import { api } from '@/api'
import { Toast } from 'vant'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const form = reactive({
	content: '',
})

const disabledSubmit = computed(() => {
	return !form.content
})

const loading = ref(false)
const router = useRouter()

async function submit() {
	await api.complaint.complaint(form.content)
	Toast.success('提交成功')

	router.go(-1)
}
</script>

<style lang="scss" scoped>
.wechatGroup {
	.submit {
		@apply mt-5 mb-24;
	}
}
</style>
