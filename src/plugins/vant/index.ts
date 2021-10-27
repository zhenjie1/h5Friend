import { App } from 'vue'
import {
	Button,
	Field,
	CellGroup,
	Uploader,
	Cell,
	Form,
	Popup,
	Picker,
	Area,
	Toast,
	Icon,
} from 'vant'
import 'css/vant.scss'

export default function initVant(app: App<Element>) {
	app.use(Icon)
	app.use(Area)
	app.use(Button)
	app.use(Uploader)
	app.use(Form)

	app.use(Cell)
	app.use(CellGroup)
	app.use(Field)
	app.use(Toast)

	app.use(Popup)
	app.use(Picker)
}
