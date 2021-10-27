import { createApp } from 'vue'
import VConsole from 'vconsole'
import AppTemp from '@/App.vue'

// const vconsole = new VConsole({})

// import 'js/reload'

import store from '@/store'
import initGlobalComponent from '@/plugins/globalComponents/globalComponents'

// 引入的 css 资源
import 'css/tailwindcss.css'
import 'css/clear.scss'
import 'css/common.scss'
import 'css/wechat.scss'
// import 'css/theme/blackTheme.css'
import router from './router/index'
import { appentTheme } from './assets/css/theme'
import initVant from './plugins/vant'

// 添加主题
appentTheme()

const app = createApp(AppTemp as any)

app.config.performance = true

app.use(router).use(store)

initVant(app)
initGlobalComponent(app)

app.mount('#app')
