import fs from 'fs'
import path from 'path'

const APPS_PATH = path.join(__dirname, '../db/apps.json')

export default class Configer {
	constructor ({appId}) {
		this.appId = appId
		this.appConf = this.getConfig({appId})
	}

	// 获取App信息
	getConfig () {
		const appsInfo = JSON.parse(fs.readFileSync(APPS_PATH)) || {}
		return appsInfo[this.appId] || {}
	}

	// 添加更新App信息
	updateConfig (data) {
		const appsInfo = JSON.parse(fs.readFileSync(APPS_PATH)) || {}
		appsInfo[data.appId] = data
		fs.writeFileSync(APPS_PATH, JSON.stringify(appsInfo, null, 4))
	}

	deleteConfig (appId) {
		const appsInfo = JSON.parse(fs.readFileSync(APPS_PATH)) || {}
		delete appsInfo[appId]
		fs.writeFileSync(APPS_PATH, JSON.stringify(appsInfo, null, 4))
	}
}
