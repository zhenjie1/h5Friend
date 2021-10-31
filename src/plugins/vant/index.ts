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
	Image as VanImage,
	ImagePreview,
	NavBar,
	Lazyload,
	ActionSheet,
	Swipe,
	SwipeItem,
	Switch,
} from 'vant'
import 'css/vant.scss'

export default function initVant(app: App<Element>) {
	app.use(Lazyload)
	app.use(Icon)
	app.use(ActionSheet)
	app.use(Area)
	app.use(Button)
	app.use(Uploader)
	app.use(Form)
	app.use(NavBar)
	app.use(VanImage)
	app.use(ImagePreview)

	app.use(Swipe)
	app.use(SwipeItem)

	app.use(Cell)
	app.use(CellGroup)
	app.use(Field)
	app.use(Toast)
	app.use(Switch)

	app.use(Popup)
	app.use(Picker)
}
