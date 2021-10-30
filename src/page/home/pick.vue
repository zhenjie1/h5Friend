<template>
	<div class="pick">
		<!-- <van-nav-bar title="抽纸条" left-arrow left-text="返回"></van-nav-bar> -->
		<van-form @submit="submit">
			<van-cell-group>
				<van-field
					v-model="form.age"
					label="年龄"
					required
					readonly
					label-width="40"
					label-align="right"
					placeholder="请输入你的年龄"
					:rules="[{ required: true, message: '请填写您的年龄' }]"
					@click="show.age = true"
				/>
				<van-field
					v-model="sexCheck.name"
					is-link
					label-align="right"
					label-width="40"
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
					label-width="40"
					is-link
					label-align="right"
					readonly
					@click="toNav('pick/hobby')"
				></van-field>
				<van-field
					v-model="form.school.name"
					label="学校"
					readonly
					label-width="40"
					label-align="right"
					is-link
					@click="toNav('pick/school')"
				></van-field>
				<van-field
					v-model="address"
					label="地址"
					label-align="right"
					label-width="40"
					readonly
					is-link
					@click="changeShow('city', true)"
				>
				</van-field>
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
					:area-list="areaList"
					:columns-num="2"
					@confirm="changeLocation"
					@cancel="show.city = false"
				></van-area>
			</van-popup>

			<van-button
				:loading="submitLoading"
				round
				block
				type="primary"
				class="submitBtn"
				native-type="submit"
			>
				抽取一张纸条
			</van-button>
			<!-- <pre>{{ form }}</pre> -->
		</van-form>
		<van-popup v-model:show="show.age" position="bottom">
			<van-picker
				ref="selectAgeRef"
				title="选择年龄区间"
				:columns="ageColumns"
				@change="ageChange"
				@confirm="show.age = false"
			></van-picker>
		</van-popup>
		<global-view></global-view>
	</div>
</template>

<script lang="ts">
import { areaList } from '@vant/area-data'
import { api } from '@/api'
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { homeBus } from './put.vue'

export default defineComponent({
	name: 'Pick',
	setup() {
		const router = useRouter()

		const form: Data = reactive({
			age: '',
			sexKey: 1,
			city: '',
			cityId: 0,
			address: [''],
			hobby: {} as Data,
			school: {} as Data,
		})
		homeBus.on('setSchool', (item) => (form.school = item))
		homeBus.on('setHobby', (item) => (form.hobby = item))

		const show = reactive({
			selectSex: false,
			city: false,
			age: false,
		})

		const sexData = [
			{ name: '小哥哥', id: 1 },
			{ name: '小姐姐', id: 2 },
		]
		// 修改性别
		const changeSex = (item: Data) => {
			form.sexKey = item.id
			show.selectSex = false
		}

		//修改地区
		const changeLocation = async (data: any) => {
			const [province, city] = data
			form.address = [province.name, city.name]
			const result = await api.home.getCityCode(city.name)

			show.city = false
			form.cityId = result.data[0]?.id
			console.log(province.name, city.name, result)
		}

		const sexCheck = computed(() => {
			return sexData.find((v) => v.id == form.sexKey)
		}) as Data
		const address = computed(() => {
			if (form.address.length === 0) return ''
			return form.address.join()
		})

		function createAge(min: number, max: number) {
			const arr = []
			for (let i = min; i <= max; i++) {
				arr.push(i)
			}

			return arr
		}

		const selectAgeRef = ref(null) as any
		const ageColumns = [
			// 第一列
			{
				values: createAge(14, 80),
				defaultIndex: 4,
			},
			// 第二列
			{
				values: createAge(15, 80),
				defaultIndex: 5,
			},
		]
		const ageValue = ref([18, 20])
		watch(
			ageValue,
			() => {
				form.age = `${ageValue.value[0]} - ${ageValue.value[1]}`
			},
			{ immediate: true, deep: true }
		)
		const ageChange = (item: [number, number]) => {
			const [min, max] = item
			if (min > max) {
				selectAgeRef.value.setValues([min, min + 1])
				ageValue.value[0] = min
				ageValue.value[1] = min + 1
			} else {
				ageValue.value[0] = min
				ageValue.value[1] = max
			}
		}
		const submitLoading = ref(false)
		return {
			submitLoading,
			ageValue,
			selectAgeRef,
			ageChange,
			address,
			ageColumns,
			toNav(path: string) {
				router.push(path)
			},
			changeLocation,
			areaList,
			show,
			sexData,
			changeSex,
			sexCheck,
			form,
			async submit() {
				const data = await api.home.pickNote({
					sex: sexCheck.value.id,
					china_id: form.cityId,
					school_id: form.school.id,
					age_scope: form.age.replace(/ /g, ''),
					hobby_ids: form.hobby.id,
				})

				if (data.free === 1) {
					router.replace('/home/pickList')
				}
				console.log(data)
			},
		}
	},
	methods: {
		changeShow(this: any, key: string, val: boolean) {
			this.show[key] = val
		},
	},
})
</script>

<style lang="scss" scoped>
.pick {
	.submitBtn {
		margin: 40px auto 120px;
	}
}
</style>
