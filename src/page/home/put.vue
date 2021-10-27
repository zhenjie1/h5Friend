<template>
	<div class="putContainer">
		<!-- 可以使用 CellGroup 作为容器 -->
		<van-form @submit="submit">
			<van-cell-group>
				<van-field
					v-model="form.wxid"
					label="微信号"
					label-width="60"
					label-align="right"
					required
					placeholder="请输入微信号"
					:rules="[{ required: true, message: '请填写您的微信号' }]"
				/>
				<van-field
					v-model="form.age"
					label="年龄"
					required
					label-width="60"
					label-align="right"
					placeholder="请输入你的年龄"
					type="number"
					:rules="[{ required: true, message: '请填写您的年龄' }]"
				/>
				<van-field
					v-model="form.sex"
					is-link
					label-align="right"
					label-width="60"
					readonly
					label="性别"
					required
					placeholder="请选择性别"
					:rules="[{ required: true, message: '请填写您的性别' }]"
					@click="show.selectSex = true"
				/>
				<van-field
					v-model="form.hobby.name"
					label="爱好"
					label-width="60"
					is-link
					label-align="right"
					readonly
					@click="toNav('put/hobby')"
				></van-field>
				<van-field
					v-model="form.school.name"
					label="学校"
					readonly
					label-width="60"
					label-align="right"
					is-link
					@click="toNav('put/school')"
				></van-field>
				<van-field
					v-model="address"
					label="地址"
					label-align="right"
					label-width="60"
					readonly
					is-link
					@click="changeShow('city', true)"
				>
				</van-field>
				<van-field
					v-model="form.introduction"
					rows="3"
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

			<van-popup v-model:show="show.city" position="bottom">
				<van-area
					:area-list="areaList"
					@confirm="changeLocation"
					@cancel="show.city = false"
				></van-area>
			</van-popup>
			<van-popup v-model:show="show.selectSex" position="bottom">
				<van-picker :columns="['男', '女']" @confirm="changeSex"></van-picker>
			</van-popup>

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
import { computed, defineComponent, reactive, ref } from 'vue'
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
			sex: '男',
			sexKey: 1,
			city: '',
			introduction: '',
			imageUrls: [],
			cityId: 0,
			address: [''],
			hobby: {} as Data,
			school: {} as Data,
		})

		const initForm = cloneDeep(form)
		const uploadFile = getRef('uploadFile') as any
		const initFormFn = () => {
			for (const i in form) {
				form[i] = initForm[i]
			}

			uploadFile.value?.clear()
		}
		// onMounted(() => {
		console.log(getRef('uploadFile'))
		// })

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
		const changeSex = (val: string, index: number) => {
			form.sex = val
			form.sexKey = index + 1
			show.selectSex = false
		}

		//修改地区
		const changeLocation = async (data: any) => {
			const [province, city, district] = data
			form.address = [province.name, city.name, district.name]
			const result = await api.home.getCityCode(city.name)

			show.city = false
			form.cityId = result.data[0]?.id
			console.log(province.name, city.name, district.name, result)
		}

		const submitLoading = ref(false)
		return {
			fileList,
			areaList,
			address,
			form,
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
					china_id: form.cityId == 0 ? undefined : form.cityId,
				}
				const data = (await api.home.enterNote(params)) as Data
				Toast(data.msg)
				initFormFn()
			},
		}
	},
	mounted() {
		AMapCollection.getUserPositionInfo().then((res) => {
			this.form.city = res.addressComponent.city
			console.log(this.form.city)
		})
	},
	methods: {
		afterRead(files: Data[]) {
			if (!Array.isArray(files)) files = [files]
			if (files.length > 0) {
				Toast.loading({
					message: '正在上传照片',
					duration: 0,
				})
			}
			uploadImage(files.map((v) => v.file))
				.then((res) => {
					console.log(res)
				})
				.catch((err) => {
					Toast.clear()
					if (err.msg) Toast(`第 ${err.index + 1} 张: ${err.msg}`)
				})
			// console.log(files)
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
