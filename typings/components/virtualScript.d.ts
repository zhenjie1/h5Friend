declare namespace Virtual {
	interface params {
		data: Friend.data[]
		itemHeight: number
		showNumber: number
		topOffsetIndex: number
		[key: string]: any
	}

	interface returns {
		allData: Friend.data[]
		showData: Friend.data[]
		startIndex: number
		parentHeight: number
		posIndex: number[]
		parentDom?: HTMLElement
	}
}
