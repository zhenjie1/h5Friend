<template>
	<div class="putContainer">
		<van-form @submit="submit">
			<van-cell-group>
				<van-field
					v-model="form.wxid"
					size="large"
					label="微信号"
					label-width="60"
					label-align="right"
					required
					placeholder="请输入微信号"
					:rules="[{ required: true, message: '请填写您的微信号' }]"
				/>
				<van-field
					v-model="form.age"
					size="large"
					label="年龄"
					is-link
					required
					label-width="60"
					label-align="right"
					placeholder="请输入你的年龄"
					type="number"
					:rules="[{ required: true, message: '请填写您的年龄' }]"
				/>
				<van-field
					v-model="sexCheck.name"
					size="large"
					label-align="right"
					label-width="60"
					is-link
					readonly
					label="性别"
					required
					placeholder="请选择性别"
					:rules="[{ required: true, message: '请填写您的性别' }]"
					@click="show.selectSex = true"
				/>
				<van-field
					v-model="form.hobby.name"
					size="large"
					label="爱好"
					label-width="60"
					label-align="right"
					readonly
					@click="toNav('put/hobby')"
				>
					<template #button>
						<van-icon
							:name="form.hobby.name ? 'clear' : 'arrow'"
							@click.stop="form.hobby = []"
						/>
					</template>
				</van-field>
				<van-field
					v-model="address"
					size="large"
					label="地址"
					label-align="right"
					label-width="60"
					readonly
					@click="changeShow('city', true)"
				>
					<template #button>
						<van-icon
							:name="address ? 'clear' : 'arrow'"
							@click.stop="form.address = []"
						/>
					</template>
				</van-field>
				<van-field
					v-model="form.school.name"
					label="学校"
					size="large"
					readonly
					label-width="60"
					label-align="right"
					@click="toSchool"
				>
					<template #button>
						<van-icon
							:name="form.school.name ? 'clear' : 'arrow'"
							@click.stop="form.school = {}"
						/>
					</template>
				</van-field>

				<van-field
					v-model="form.introduction"
					rows="3"
					size="large"
					autosize
					required
					label="简介"
					label-width="60"
					maxlength="240"
					label-align="right"
					show-word-limit
					type="textarea"
					:rules="[{ required: true, message: '请填写简介' }]"
					placeholder="请输入简介"
				/>
			</van-cell-group>

			<van-action-sheet
				v-model:show="show.selectSex"
				description="选择性别"
				:actions="sexData"
				cancel-text="取消"
				@select="changeSex"
			></van-action-sheet>

			<van-popup v-model:show="show.city" position="bottom">
				<van-area
					:value="form.adcode"
					:area-list="areaList"
					@confirm="changeLocation"
					@cancel="show.city = false"
				></van-area>
			</van-popup>
			<!-- <van-popup v-model:show="show.selectSex" position="bottom">
				<van-picker :columns="['小哥哥', '小姐姐']" @confirm="changeSex"></van-picker>
			</van-popup> -->

			<upload-file
				ref="uploadFile"
				v-model="form.imageUrls"
				multiple
				class="m-3"
			></upload-file>
			<van-button
				:loading="submitLoading"
				round
				block
				type="primary"
				class="submitBtn"
				native-type="submit"
			>
				确定放入纸条
			</van-button>
			<!-- <pre>{{ form }}</pre> -->
		</van-form>

		<!-- <canvas id="container" class="w-full h-96"></canvas> -->

		<global-view></global-view>
	</div>
</template>

<script lang="ts">
import { areaList } from '@vant/area-data'
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import mitt from 'mitt'
import { useRouter } from 'vue-router'
import { api } from '@/api'
import AMapCollection from '@/utils/map'
import { getRef, uploadImage } from '@/utils/tool'
import { Toast } from 'vant'
import { cloneDeep } from 'lodash'
export const homeBus = mitt()

export default defineComponent({
	name: 'PutInfo',
	setup() {
		const router = useRouter()
		const fileList = ref()
		const form: Data = reactive({
			wxid: '',
			age: '',
			sexKey: 1,
			adcode: '', // 选中的城市编码
			// adcode: '410105', // 选中的城市编码
			city: undefined,
			introduction: '',
			imageUrls: [],
			address: [],
			hobby: {} as Data,
			school: {} as Data,
		})

		watch(
			() => form.age,
			() => {
				if (form.age > 60) {
					Toast('年龄最大可输入 60')
					form.age = 60
				}
			}
		)

		const sexData = [
			{ name: '小哥哥', id: 1 },
			{ name: '小姐姐', id: 2 },
		]

		const sexCheck = computed<{ name: string; id: number }>(() => {
			return sexData.find((v) => v.id == form.sexKey)!
		})

		const initForm = cloneDeep(form)
		const uploadFile = getRef('uploadFile') as any
		const initFormFn = () => {
			for (const i in form) {
				form[i] = initForm[i]
			}

			uploadFile.value?.clear()
		}

		const address = computed(() => {
			if (form.address.length !== 3) return ''
			return form.address.join()
		})

		homeBus.on('setSchool', (item) => (form.school = item))
		homeBus.on('setHobby', (item) => (form.hobby = item))

		const show = reactive({
			selectSex: false,
			city: false,
		})

		// 修改性别
		const changeSex = (item: Data) => {
			form.sexKey = item.id
			show.selectSex = false
		}

		//修改地区
		const changeLocation = async (data: any) => {
			const [province, city, district] = data
			form.address = [province.name, city.name, district.name]
			const result = await api.home.getCityCode(city.name)

			show.city = false
			form.city = result.data[0]
		}
		AMapCollection.getUserPositionInfo().then((res) => {
			const { province, city, district, adcode } = res.addressComponent
			form.adcode = adcode
			changeLocation([{ name: province }, { name: city }, { name: district }])
		})

		const submitLoading = ref(false)
		return {
			fileList,
			areaList,
			address,
			form,
			sexCheck,
			sexData,
			show,
			submitLoading,
			changeSex,
			changeLocation,
			toNav(path: string) {
				router.push(path)
			},
			async submit() {
				const params = {
					intro: form.introduction,
					wechat_id: form.wxid,
					sex: form.sexKey,
					images: form.imageUrls.join(),
					hobby_ids: form.hobby.id,
					school_id: form.school.id,
					age: form.age,
					china_id: form.city?.id,
				}
				submitLoading.value = true
				const data = (await api.home
					.enterNote(params)
					.catch(() => (submitLoading.value = false))) as Data
				if (data.msg) Toast(data.msg)

				if (data.data.free === 2) {
					Toast.loading({ duration: 0, forbidClick: true, message: '正在下单' })

					api.wxpay
						.startPay(data.data.orderData, true)
						.then(initFormFn)
						.finally(() => {
							submitLoading.value = false
							router.replace('/home/putList')
						})
				} else {
					submitLoading.value = false
					initFormFn()
					router.replace('/home/putList')
				}
			},
		}
	},
	methods: {
		toSchool() {
			let path = 'put/school/'
			if (this.form.city) path += this.form.city.pid
			this.toNav(path)
		},
		afterRead(files: Data[]) {
			if (!Array.isArray(files)) files = [files]
			if (files.length > 0) {
				Toast.loading({
					message: '正在上传照片',
					duration: 0,
				})
			}
			uploadImage(files.map((v) => v.file)).catch((err) => {
				Toast.clear()
				if (err.msg) Toast(`第 ${err.index + 1} 张: ${err.msg}`)
			})
		},
		changeShow(this: any, key: string, val: boolean) {
			this.show[key] = val
		},
	},
})
</script>

<style scoped lang="scss">
.putContainer {
	.submitBtn {
		margin: 20px auto 120px;
	}
	.uploadTemplate {
		width: 90%;
		margin: 20px auto;
		display: block;
	}
}
</style>
