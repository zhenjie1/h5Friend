const { host } = location

// 是否是视频号
export const isVideo = host.indexOf('piqie.com') !== -1
