/**
 * .vue 文件中 emit 不符合格式时打印日志
 *
 * @param {any} info 打印的信息
 */
export function emitErrLog(info?: any) {
	console.error('emit 不符合要求, 请检查程序!', info)
}
