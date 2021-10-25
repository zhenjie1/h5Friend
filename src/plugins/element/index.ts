import { App } from 'vue'
import {
	ElButton,
	ElTabs,
	ElTabPane,
	ElInput,
	ElTable,
	ElTableColumn,
	ElPagination,
	ElRadio,
	ElRadioGroup,
	ElDialog,
	ElCascader,
	ElCascaderPanel,
	ElForm,
	ElFormItem,
	ElSwitch,
	ElRow,
	ElCol,
	ElCheckbox,
	ElSelect,
	ElOption,
	locale,
} from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'

/**
 * 初始化 element ui 数据
 *
 * @param {App<Element>} app createApp 的返回
 * @returns {void}
 */
export default function initElementUi(app: App<Element>) {
	locale(lang)
	// app.config.globalProperties.$ELEMENT = {
	// 	size: 'small',
	// }
	app.component(ElButton.name, ElButton)
	app.component(ElTabs.name, ElTabs)
	app.component(ElTabPane.name, ElTabPane)
	app.component(ElTable.name, ElTable)
	app.component(ElDialog.name, ElDialog)

	app.component(ElRadioGroup.name, ElRadioGroup)
	app.component(ElRadio.name, ElRadio)

	app.component(ElCascader.name, ElCascader)
	app.component(ElCascaderPanel.name, ElCascaderPanel)

	app.component(ElTableColumn.name, ElTableColumn)
	app.component(ElPagination.name, ElPagination)
	app.component(ElInput.name, ElInput)
	app.component(ElRow.name, ElRow)
	app.component(ElCol.name, ElCol)
	app.component(ElForm.name, ElForm)
	app.component(ElFormItem.name, ElFormItem)
	app.component(ElSwitch.name, ElSwitch)
	app.component(ElCheckbox.name, ElCheckbox)
	app.component(ElSelect.name, ElSelect)
	app.component(ElOption.name, ElOption)
}
