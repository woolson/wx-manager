import path from 'path'
import fs from 'fs'

const WHITE_LIST = path.join(__dirname, '../db/white-list.json')

// 授权管理
export default class Authorize {
	constructor (ctx) {
		// 获取到请求IP地址
		const ip = ctx.request.ip || ''
		this.requestIp = ip.replace('::ffff:', '')
		console.log(this.requestIp)
	}

	isIpSafe () {
		const whiteList = JSON.parse(fs.readFileSync(WHITE_LIST))
		const ipIndex = whiteList.indexOf(this.requestIp)

		// 返回true/false, true为有权限，false无权限
		return ipIndex !== -1
	}
}
