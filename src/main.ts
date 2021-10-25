import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AppTemp from '@/App.vue'
import 'js/tool/index'
import 'js/test'

import 'js/rxjs/index'

// import 'js/reload'
import '@/plugins/socket/index'

import initGlobalDirective from './assets/js/directive'
import store from '@/store'
import '@/pinia'
import initElementUi from '@/plugins/element'
import initGlobalComponent from '@/plugins/globalComponents/globalComponents'
import '@/plugins/indexDB/index'

// 引入的 css 资源
import 'css/tailwindcss.css'
import 'css/clear.scss'
import 'css/common.scss'
import 'css/wechat.scss'
// import 'css/theme/blackTheme.css'
import router from './router/index'
import { appentTheme } from './assets/css/theme'

// 添加主题
appentTheme()

async function createVue() {
	const app = createApp(AppTemp as any)

	app.config.performance = true

	app.use(router).use(store).use(createPinia())

	initGlobalDirective(app)
	initElementUi(app)
	initGlobalComponent(app)

	app.mount('#app')
}

createVue()
