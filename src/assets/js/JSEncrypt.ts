import { addScript } from 'utils/index'

/**
 * 十六进制转字节
 *
 * @param {string} hex 字符
 * @returns {string} 转换后的字符
 */
export function hexToBytes(hex: any) {
	const bytes = []
	for (let c = 0; c < hex.length; c += 2) {
		bytes.push(parseInt(hex.substr(c, 2), 16))
	}
	return bytes
}

/**
 * 字节转十六进制
 *
 * @param {string} bytes 字符
 * @returns {string} 转换后的字符
 */
export function bytesToHex(bytes: any) {
	const hex = []
	for (let i = 0; i < bytes.length; i++) {
		hex.push((bytes[i] >>> 4).toString(16))
		hex.push((bytes[i] & 0xf).toString(16))
	}
	return hex.join('')
}

const loadJsencrypt = addScript('//qulv.s3-ap-southeast-1.amazonaws.com/upload/jsencrypt.min.js')
const loadPako = addScript('//cdn.bootcss.com/pako/1.0.6/pako.min.js')

Promise.all([loadJsencrypt, loadPako]).then(() => {
	window.JSEncrypt.prototype.encryptLong2 = function (string: string) {
		const k = this.getKey()
		try {
			let ct = ''
			// RSA每次加密117bytes，需要辅助方法判断字符串截取位置
			// 1.获取字符串截取点
			const bytes = []
			bytes.push(0)
			let byteNo = 0
			let c
			const len = string.length
			let temp = 0
			for (let i = 0; i < len; i++) {
				c = string.charCodeAt(i)
				if (c >= 0x010000 && c <= 0x10ffff) {
					byteNo += 4
				} else if (c >= 0x000800 && c <= 0x00ffff) {
					byteNo += 3
				} else if (c >= 0x000080 && c <= 0x0007ff) {
					byteNo += 2
				} else {
					byteNo += 1
				}
				if (byteNo % 117 >= 114 || byteNo % 117 === 0) {
					if (byteNo - temp >= 114) {
						bytes.push(i)
						temp = byteNo
					}
				}
			}
			// 2.截取字符串并分段加密
			if (bytes.length > 1) {
				for (let y = 0; y < bytes.length - 1; y++) {
					let str
					if (y === 0) {
						str = string.substring(0, bytes[y + 1] + 1)
					} else {
						str = string.substring(bytes[y] + 1, bytes[y + 1] + 1)
					}
					const t1 = k.encrypt(str)
					ct += t1
				}
				if (bytes[bytes.length - 1] !== string.length - 1) {
					const lastStr = string.substring(bytes[bytes.length - 1] + 1)
					ct += k.encrypt(lastStr)
				}
				return hexToBytes(ct)
			}
			const t = k.encrypt(string)
			return hexToBytes(t)
		} catch (ex) {
			return false
		}
	}

	window.JSEncrypt.prototype.decryptLong2 = function (string: string) {
		// debugger
		const k = this.getKey()
		// var maxLength = ((k.n.bitLength()+7)>>3);
		const MAX_DECRYPT_BLOCK = 128
		try {
			let ct = ''
			let t1
			let bufTmp
			let hexTmp
			const str = bytesToHex(string)
			const buf = hexToBytes(str)
			const inputLen = buf.length
			// 开始长度
			let offSet = 0
			// 结束长度
			let endOffSet = MAX_DECRYPT_BLOCK

			// debugger
			// 分段加密
			while (inputLen - offSet > 0) {
				if (inputLen - offSet > MAX_DECRYPT_BLOCK) {
					bufTmp = buf.slice(offSet, endOffSet)
					hexTmp = bytesToHex(bufTmp)
					t1 = k.decrypt(hexTmp)
					ct += t1
				} else {
					bufTmp = buf.slice(offSet, inputLen)
					hexTmp = bytesToHex(bufTmp)
					t1 = k.decrypt(hexTmp)
					ct += t1
				}
				offSet += MAX_DECRYPT_BLOCK
				endOffSet += MAX_DECRYPT_BLOCK
			}
			return ct
		} catch (ex) {
			return false
		}
	}

	window.JSEncrypt.prototype.setPublicKeyFn = function (object: any) {
		const PUBLIC_KEY =
			'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCT1kv0aKkNIpPv4gtxSUP3FdFp\n' +
			'aIRyPG40Ozn31Velbjm2NLt+izLKC7iITl+KYCjpmikFC4P165g0EjS2n5iBX/PF\n' +
			'qjwBvKGLRn74WXv9T2+rl9oV5ZGkLAaNNomuZ7n+vIbRVLZ8kfVj/Ae8Miit7OjU\n' +
			'HG+KKdS60lKS3zs58wIDAQAB'
		object.setPublicKey(
			'-----BEGIN PUBLIC KEY-----\n' + PUBLIC_KEY + '\n-----END PUBLIC KEY-----'
		)
	}

	window.JSEncrypt.prototype.setPrivateKeyFn = function (object: any) {
		const PRIVATE_KEY =
			'MIICXAIBAAKBgQCT1kv0aKkNIpPv4gtxSUP3FdFpaIRyPG40Ozn31Velbjm2NLt+\n' +
			'izLKC7iITl+KYCjpmikFC4P165g0EjS2n5iBX/PFqjwBvKGLRn74WXv9T2+rl9oV\n' +
			'5ZGkLAaNNomuZ7n+vIbRVLZ8kfVj/Ae8Miit7OjUHG+KKdS60lKS3zs58wIDAQAB\n' +
			'H3engxieURma3QzK#5#gYWaiDdGAgMBA#AECgYBPNuTGcdxQM5+UP7SZiXYPvloF\n' +
			'PIZPXP#0mW5ue#x6p1rOcFfYVcv0PKG7foXZx#Dm7fc0oPSaRpHbWY7Ot12MElKk\n' +
			'AoGAL54FpvqTAOUTS1++mcWke5BufAorJvRp9q7g8/+mlGVVd2eywIarXEK8NEMy\n' +
			'KMriQqPh9HsKDQrOYm8+xVfQcdYPm1qZ94LJ7HxCc+Oy9yqWc5smBqtbGdyhdStN\n' +
			'L3vfXagcSzNCi8ZoIUSVIhdzPM+4hiTTfCPDpEe76hPQHAECQQDHLfGv5L7COTra\n' +
			'Jj2OP6QnKZxW88vetEbnJjEXyXdwu9lPUUogbNbHXzr11BJAQuWfsLdp82bYuwUb\n' +
			'BwEIs0fzAkEAvgLTENh9wEl+qcwreArrCFvQY6Y+8yLQ6IV6g76d0VOUBh0TRT67\n' +
			'gA1K/BtaI4HfZ7Oe2HkLvOR+YrpCihbGAQJAEKq7iqhtffsj/ZUtmXWh2tUUjAIi\n' +
			'kSQsurLrcL4fDIPrj0OSHFx/LHe/i0qPrGjspgw3jNodRQ2BQ922LHA0GQJANWG9\n' +
			'woHP8nGzcCi4HaWTmmmRBi3yiYRChNDbNqAa3nBIqd8JRu705mjVpDZbAJbAGPZR\n' +
			'ridzsMHQ8BO8FeeIAQJBALxW1TG38Wki6M0oh81nDrfWKmTfX7Ker4cyWqbEfRJl\n' +
			'ZqO4xuigNJ6dza2EaDYhs6IiQJGJ6h5Fj5CVvwRxX8g='
		object.setPrivateKey(
			'-----BEGIN RSA PRIVATE KEY-----\n' + PRIVATE_KEY + '\n-----END RSA PRIVATE KEY-----'
		)
	}
})

/**
 * 对字符串进行加密
 *
 * @param {string} string 要加密的字符串
 * @param {boolean} isZip 是否要压缩
 * @returns {string} 加密后的字符串
 */
export async function stringEncrypt(string: string | File, isZip = false): Promise<string> {
	if (string instanceof File) {
		string = await new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.onload = () => {
				if (!reader.result) {
					reject('选择文件内容为空！')
				} else {
					resolve(reader.result as any)
				}
			}
			reader.readAsText(string as any)
		})
	}
	if (!string) return Promise.reject('加密失败, 内容为空')
	if (typeof string !== 'string') return Promise.reject('')

	const list = string.split('\n').filter((v) => !!v)
	const size = 100
	const len = Math.ceil(list.length / size)

	let encryptString = ''
	for (let i = 0; i < len; i++) {
		let str = list.slice(size * i, size * (i + 1)).join('\n')
		if (isZip) str = zip(str)

		encryptString += i !== 0 ? `,${encrypt(str)}` : encrypt(str)
	}

	return encryptString

	/**
	 * 加密
	 *
	 * @param {string} string 要加密的字符
	 * @returns {void}
	 */
	function encrypt(string: string) {
		const encrypt = new window.JSEncrypt()
		encrypt.setPublicKeyFn(encrypt)
		const encrypted = encrypt.encryptLong2(string)
		return bytesToHex(encrypted)
	}
}

/**
 * 对字符串进行解密
 *
 * @param {string} string 要加密的字符串
 * @returns {string} 加密后的字符串
 */
export function stringDecryption(string: string) {
	const decrypt = new window.JSEncrypt()
	decrypt.setPrivateKeyFn(decrypt)
	const str = decrypt.decryptLong2(hexToBytes(string))
	return unzip(str)
}

/**
 * 压缩
 *
 * @param {string} str 要压缩的字符串
 * @returns {string} 压缩后的值
 */
function zip(str: string) {
	const binaryString = window.pako.gzip(str, { to: 'string' })

	return btoa(binaryString)
}

/**
 * 解压
 *
 * @param {string} b64Data 要解压的字符
 * @returns {str} 解压后的字符
 */
function unzip(b64Data: string) {
	let strData = atob(b64Data)
	// Convert binary string to character-number array
	const charData = strData.split('').map(function (x) {
		return x.charCodeAt(0)
	})
	// Turn number array into byte-array
	const binData = new Uint8Array(charData)

	// // unzip
	const data = window.pako.inflate(binData)
	const val: any = new Uint16Array(data)
	// Convert gunzipped byteArray back to ascii string:
	strData = String.fromCharCode.apply(null, val)
	return strData
}

// // 加载插件
// addScript('//qulv.s3-ap-southeast-1.amazonaws.com/upload/jsencrypt.min.js').then(() => {
//   window.JSEncrypt.prototype.encryptLong2 = function (string) {
//     var k = this.getKey()
//     try {
//       var ct = ''
//       // RSA每次加密117bytes，需要辅助方法判断字符串截取位置
//       // 1.获取字符串截取点
//       var bytes = []
//       bytes.push(0)
//       var byteNo = 0
//       var len, c
//       len = string.length
//       var temp = 0
//       for (var i = 0; i < len; i++) {
//         c = string.charCodeAt(i)
//         if (c >= 0x010000 && c <= 0x10FFFF) {
//           byteNo += 4
//         } else if (c >= 0x000800 && c <= 0x00FFFF) {
//           byteNo += 3
//         } else if (c >= 0x000080 && c <= 0x0007FF) {
//           byteNo += 2
//         } else {
//           byteNo += 1
//         }
//         if ((byteNo % 117) >= 114 || (byteNo % 117) === 0) {
//           if (byteNo - temp >= 114) {
//             bytes.push(i)
//             temp = byteNo
//           }
//         }
//       }
//       // 2.截取字符串并分段加密
//       if (bytes.length > 1) {
//         for (var y = 0; y < bytes.length - 1; y++) {
//           var str
//           if (y === 0) {
//             str = string.substring(0, bytes[y + 1] + 1)
//           } else {
//             str = string.substring(bytes[y] + 1, bytes[y + 1] + 1)
//           }
//           var t1 = k.encrypt(str)
//           ct += t1
//         }
//         if (bytes[bytes.length - 1] !== string.length - 1) {
//           var lastStr = string.substring(bytes[bytes.length - 1] + 1)
//           ct += k.encrypt(lastStr)
//         }
//         return hexToBytes(ct)
//       }
//       var t = k.encrypt(string)
//       return hexToBytes(t)
//     } catch (ex) {
//       return false
//     }
//   }

//   window.JSEncrypt.prototype.decryptLong2 = function (string) {
//     // debugger
//     var k = this.getKey()
//     // var maxLength = ((k.n.bitLength()+7)>>3);
//     var MAX_DECRYPT_BLOCK = 128
//     try {
//       var ct = ''
//       var t1
//       var bufTmp
//       var hexTmp
//       var str = bytesToHex(string)
//       var buf = hexToBytes(str)
//       var inputLen = buf.length
//       // 开始长度
//       var offSet = 0
//       // 结束长度
//       var endOffSet = MAX_DECRYPT_BLOCK

//       // debugger
//       // 分段加密
//       while (inputLen - offSet > 0) {
//         if (inputLen - offSet > MAX_DECRYPT_BLOCK) {
//           bufTmp = buf.slice(offSet, endOffSet)
//           hexTmp = bytesToHex(bufTmp)
//           t1 = k.decrypt(hexTmp)
//           ct += t1
//         } else {
//           bufTmp = buf.slice(offSet, inputLen)
//           hexTmp = bytesToHex(bufTmp)
//           t1 = k.decrypt(hexTmp)
//           ct += t1
//         }
//         offSet += MAX_DECRYPT_BLOCK
//         endOffSet += MAX_DECRYPT_BLOCK
//       }
//       return ct
//     } catch (ex) {
//       return false
//     }
//   }

//   window.JSEncrypt.prototype.setPublicKeyFn = function (object) {
//     const PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCT1kv0aKkNIpPv4gtxSUP3FdFp\n' +
//       'aIRyPG40Ozn31Velbjm2NLt+izLKC7iITl+KYCjpmikFC4P165g0EjS2n5iBX/PF\n' +
//       'qjwBvKGLRn74WXv9T2+rl9oV5ZGkLAaNNomuZ7n+vIbRVLZ8kfVj/Ae8Miit7OjU\n' +
//       'HG+KKdS60lKS3zs58wIDAQAB'
//     object.setPublicKey('-----BEGIN PUBLIC KEY-----\n' + PUBLIC_KEY + '\n-----END PUBLIC KEY-----')
//   }
// })

/**
 * 压缩
 *
 * @param {string} str 要压缩的字符串
 * @returns {string} 压缩后的值
 */
export function zipStr(str: string) {
	const binaryString = window.pako.gzip(str, { to: 'string' })

	return btoa(binaryString)
}
