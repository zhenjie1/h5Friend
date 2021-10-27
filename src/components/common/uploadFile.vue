<template>
	<div class="uploadFile">
		<div class="views grid-cols-3 gap-3">
			<div v-for="(url, index) in selectFilesView" :key="index" class="imageBox">
				<img class="image" :src="url" alt="" />
				<i class="close iconfont icon-guanbi w-6 h-6 text-center" @click="close(index)"></i>
			</div>
			<div v-if="showAdd" class="addIcon relative">
				<van-icon name="photograph" class="icon" />
				<input
					type="file"
					:accept="accept"
					:multiple="multiple"
					class="absolute left-0 top-0 w-full h-full opacity-0 z-50"
					@change="change"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { uploadImage } from '@/utils'
import { Toast } from 'vant'
import { computed, defineComponent, ref, watch } from 'vue'

export default defineComponent({
	name: 'UploadFile',
	props: {
		multiple: Boolean,
		maxCount: {
			type: Number,
			default: 9,
		},
		accept: {
			type: String,
			default: 'image/png,image/jpeg,image/jpg',
		},
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const selectFiles = ref<File[]>([])
		const serverPaths = ref<string[]>([])
		watch(serverPaths, (val) => {
			console.log('emit', serverPaths)
			emit('update:modelValue', serverPaths.value)
		})
		const selectFilesView = computed(() => selectFiles.value.map(URL.createObjectURL))

		const showAdd = computed(() => {
			return selectFiles.value.length < props.maxCount
		})

		return {
			showAdd,
			selectFilesView,
			close(index: number) {
				selectFiles.value.splice(index, 1)
				serverPaths.value.splice(index, 1)
			},
			clear() {
				selectFiles.value = []
				serverPaths.value = []
			},
			async change(e: any) {
				let files = Array.from(e.target.files) as File[]
				if (files.length == 0) return

				if (files.length + selectFiles.value.length > props.maxCount) {
					const len = selectFiles.value.length

					files = files.slice(0, props.maxCount - len)

					Toast(`最多上传 ${props.maxCount} 张`)
				}
				// 添加图片之前的数量
				const prevIndex = selectFiles.value.length
				selectFiles.value = [...selectFiles.value, ...files]

				Toast.loading({
					message: '正在上传照片',
					duration: 0,
				})
				const data = await uploadImage(files).catch((err) => {
					Toast.clear()
					if (err.msg) Toast(`第 ${err.index + 1} 张: ${err.msg}`)
					// 恢复选择图片之前
					selectFiles.value.splice(prevIndex, files.length)
					throw new Error(`第 ${err.index + 1} 张: ${err.msg}`)
				})

				Toast.clear()
				serverPaths.value = [...serverPaths.value, ...data]

				console.log(data)
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.uploadFile {
	.addIcon {
		@apply bg-bg-hover w-full h-0;
		padding-bottom: 100%;

		.icon {
			@apply absolute text-2xl opacity-10;
			top: 50%;
			left: 50%;

			transform: translate(-50%, -50%);
		}
	}
	.views {
		display: grid;
		.imageBox {
			width: 100%;
			height: 0;
			padding-bottom: 100%;
			position: relative;
			overflow: hidden;
			.close {
				@apply absolute right-0 top-0 z-10 text-xs;
				background-color: rgba(0, 0, 0, 0.8);
				color: white;
				line-height: 24px;
			}

			.image {
				position: absolute;
				width: 100%;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
}
</style>
