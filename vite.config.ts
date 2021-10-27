import { defineConfig } from 'vite'
import styleImport from 'vite-plugin-style-import'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'

const cssPath = join(__dirname, 'src/assets/css/scssConfig.scss').replace(/\\/g, '/')
export default defineConfig({
	base: '/',
	plugins: [
		vue(),
		styleImport({
			libs: [
				{
					libraryName: 'vant',
					esModule: true,
					resolveStyle: (name) => `vant/es/${name}/style`,
				},
			],
		}),
	],
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
	server: {
		proxy: {
			'/zs': {
				// target: 'http://192.168.3.105:3010',
				target: 'http://152.136.201.85/index.php',
				// ws: true,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/zs/, ''),
			},
			'/wcz': {
				target: 'http://wcz.free.idcfengye.com/index.php',
				// ws: true,
				// changeOrigin: true,
				rewrite: (path) => path.replace(/^\/wcz/, ''),
			},
		},
	},
})
