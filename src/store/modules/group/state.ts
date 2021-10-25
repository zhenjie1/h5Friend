type PropType<T, Path extends string> = string extends Path
	? unknown
	: Path extends keyof T
	? T[Path]
	: Path extends `${infer K}-${infer R}`
	? K extends keyof T
		? PropType<T[K], R>
		: unknown
	: unknown
// import { get } from 'lodash'
type MatchPair<S extends string> = S extends `[${infer A},${infer B}]` ? [A, B] : unknown
type T20 = MatchPair<'[1,2]'> // ['1', '2']
type T21 = MatchPair<'[foo,bar]'>
export type State = {
	badge: {
		// uin + wxId
		[key: string]: Message.badge
	}
	groups: {
		[uin: number]:
			| {
					[wxid: string]: Group.data
			  }
			| undefined
	}
}

const state: State = {
	badge: {},
	/**
	 * 所有的微信好友数据
	 * 存储方式:
	 * {
	 * 		['微信号唯一标识']: {
	 * 			['好友唯一标识']: Friend.data
	 * 		}
	 * }
	 */
	groups: {},
}

export default state
