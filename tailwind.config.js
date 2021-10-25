function firstToUpper(str) {
	if (!str) return ''
	return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase())
}
const theme = {
	main: '',
	red: '',
	yellow: '',
	blue: '',
	gray: '',
	wechat: {
		color: '',
		bgColor: '',
		msgColor: '',
		logoColor: '',
	},
	bg: {
		color: '',
		hover: '',
		check: '',
		mask: '',
	},
	text: {
		color: '',
		light: '',
		gray: '',
		grayDeep: '',
	},
	border: {
		color: '',
		deep: '',
	},
}

for (const i in theme) {
	if (typeof theme[i] == 'object') {
		for (const j in theme[i]) {
			theme[i][j] = `var(--${i}${firstToUpper(j)})`
		}
	} else {
		theme[i] = `var(--${i})`
	}
}

// 循环生成透明度
const transformKey = ['main', 'red', 'yellow', 'blue', 'gray']
transformKey.map((k) => {
	for (let i = 1; i < 50; i++) {
		theme[`${k}-${i * 2}`] = `var(--${k}-${i * 2})`
	}
})

const CandR = ['C', 'R']
CandR.map((ck) => {
	for (let i = 0; i < 100; i++) {
		theme[`${ck}-${i}`] = `var(--${ck}${i})`
	}
})

module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: { ...theme },
			// backgroundColor: {
			// 	red: 'var(--red)',
			// 	yellow: 'var(--yellow)',
			// 	blue: 'var(--blue)',
			// 	gray: 'var(--gray)',
			// },
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
