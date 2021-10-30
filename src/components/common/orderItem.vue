<template>
	<div class="itemContainer shadow-md mx-5 mb-5 p-4 rounded">
		<div class="container grid">
			<div class="info">
				<p class="wxidBox">
					<span class="left text-lg flex items-center overflow-hidden">
						<span class="iconfont text-lg icon-weixin mr-3"></span>
						<span class="wxid">{{ data.wechat_id }}</span>
						<span class="iconfont ml-2 font-medium" :class="[sexIcon]"></span>
					</span>
					<span class="right mx-3 flex-shrink-0">
						<van-button class="copyBtn h-4 float-right" @click="copy">复制</van-button>
					</span>
				</p>
				<p v-if="data.school" class="school text-sm mt-3 flex">
					<span class="label text-text-grayDeep mr-3 flex-shrink-0">学校</span>
					<span class="value">{{ data.school.name }}</span>
				</p>
				<p v-if="data.intro" class="hobby text-sm mt-1 flex">
					<span class="label text-text-grayDeep mr-3 flex-shrink-0">介绍</span>
					<span class="value mr-3">{{ data.intro }}</span>
				</p>
				<p v-if="data.createtime" class="hobby text-sm mt-1 flex">
					<span class="label text-text-grayDeep mr-3 flex-shrink-0">时间</span>
					<span class="value">{{ time }}</span>
				</p>
			</div>
			<div class="hobby border-l border-border-color pl-3">
				<div v-for="(hobbyItem, i) in hobbyData" :key="i" class="hobbyItem mb-1">
					{{ hobbyItem }}
				</div>
				<p v-if="hobbyData.length == 0" class="text-sm text-text-light">暂无爱好</p>
			</div>
		</div>

		<ul
			v-if="!shrinkImage && images && images.length > 0"
			class="images grid grid-cols-3 gap-3 mt-3"
		>
			<li
				v-for="(url, index) in images"
				:key="index"
				class="imageBox relative overflow-hidden rounded shadow"
			>
				<van-image
					:src="url"
					lazy-load
					class="w-full h-full"
					fit="cover"
					@click="imagePreview(index)"
				></van-image>
			</li>
		</ul>

		<div v-if="$slots.btns" class="btns">
			<slot name="btns"></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { copyText, dateTrans } from '@/utils'
import { ImagePreview, Toast } from 'vant'
import { computed, defineComponent, reactive } from 'vue'

export default defineComponent({
	name: 'OrderItem',
	props: {
		data: {
			type: Object,
			default: () => ({}),
		},
		// 是否把图片收起来
		shrinkImage: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const sexIcon = computed(() => {
			const sex = props.data.sex
			return sex === 2 ? 'icon-women' : sex === 1 ? 'icon-men' : ''
		})

		const images = computed(() => {
			return props.data.images || props.data.scrip_images
		})

		const imagePreview = (index: number) => {
			ImagePreview({
				images: images.value,
				startPosition: index,
			})
		}
		const rejectReason = [{ name: '信息不符' }, { name: '信息违规' }, { name: '没有理由' }]
		const hobbyData = computed(() => {
			if (typeof props.data.hobby === 'object') {
				if (!props.data.hobby) return []
				return props.data.hobby
			}
			return []
		})

		const time = computed(() => dateTrans(props.data.createtime * 1000, 16))

		const copy = () => {
			copyText(props.data.wechat_id)
			Toast('复制成功')
		}
		return {
			copy,
			time,
			images,
			rejectReason,
			sexIcon,
			hobbyData,
			imagePreview,
		}
	},
})
</script>

<style lang="scss" scoped>
.itemContainer {
	background-color: white;
	.container {
		grid-template-columns: 3fr 1fr;
	}
	.images {
		.imageBox {
			height: 25vw;
			.image {
				@apply w-full absolute left-0 top-1/2;
				transform: translateY(-50%);
			}
		}
	}
	.btns {
		margin-top: 6px;
		::v-deep(.btn) {
			height: 32px;
			margin-right: 10px;
		}
		.refuse {
			margin-left: 10px;
		}
	}
	.info .wxidBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.wxid {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.copyBtn {
			height: 30px;
		}
		.iconfont.icon-men {
			color: var(--blue);
		}
		.icon-women {
			color: var(--pink);
		}
	}
	.iconfont {
		color: var(--wechatColor);
	}
	.hobbyItem {
		border: 1px solid var(--main);
		display: inline-block;
		@apply px-2 rounded-full text-main text-sm;
	}
}
</style>
