import Dexie from 'dexie'

export const indexDBStore = new Map<string, Dexie>()

const storeV1 = {
	friends: 'id, letter, uin, wxId, [uin+wxId]',
	groups: 'id, letter, uin, wxId, [uin+wxId]',
	groupMember: 'id, group_username, username, account_username',
	wechats: 'id, groupId, uin, wxId',
}

export class WechatDataBase extends Dexie {
	name: string
	friends: Dexie.Table<Friend.data, string>
	groups: Dexie.Table<Group.data, string>
	wechats: Dexie.Table<Wechat.data, string>
	groupMember: Dexie.Table<Group.member, string>

	constructor(name: string) {
		name = `wechat-${name}`
		super(name)
		this.name = name

		this.version(1).stores(storeV1)

		this.friends = this.table('friends')
		this.groups = this.table('groups')
		this.wechats = this.table('wechats')

		this.groupMember = this.table('groupMember')
	}
}

/**
 * 创建一个数据库, 此项目中,每隔微信号都是一个单独的数据库
 *
 * @param {string} libraryName 数据库名字
 * @returns {Promise<Dexie>} 返回数据库对象
 */
function createIndexDB(libraryName: string) {
	const indexDB = new WechatDataBase(libraryName)
	indexDB
		.open()
		.then(() => {
			console.log('open ', libraryName)
		})
		.catch(() => {
			console.log('err')
		})
	return indexDB
}
window.createIndexDb = createIndexDB

console.log('111')
// const db1 = createIndexDB('wechat111')
// db1.wechats
// 	.put({
// 		id: '1234578',
// 		headImgUrl: '头 像123', // 头像
// 		nickName: 'nick name', // 昵称
// 		groupId: 123, // 所在分组的分组 ID
// 		status: 3, // 0: '离线', 1: '在线', 2: '异常', 3: '封号', 4: '登录中', 5: '重连中'
// 		uin: 123321, // 微信号唯一标识
// 		wxId: 'wxid_1233213j213h2j131', // 微信号 wxId
// 	})
// 	.then((res) => {
// 		// console.log(res)
// 	})
