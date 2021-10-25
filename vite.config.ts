import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'

const cssPath = join(__dirname, 'src/assets/css/scssConfig.scss').replace(/\\/g, '/')
export default defineConfig({
	plugins: [vue()],
	// optimizeDeps: {
	// 	include: ['rxjs/fetch'],
	// },
	resolve: {
		alias: {
			'@': join(__dirname, 'src/'),
			typings: join(__dirname, 'typings'),
			assets: join(__dirname, 'src/assets/'),
			css: join(__dirname, 'src/assets/css/'),
			images: join(__dirname, './src/assets/images/'),
			js: join(__dirname, 'src/assets/js/'),
			components: join(__dirname, 'src/components/'),
			utils: join(__dirname, 'src/utils/'),
			page: join(__dirname, 'src/page/'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "${cssPath}";`,
			},
		},
	},
})
