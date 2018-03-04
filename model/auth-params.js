import fs from 'fs'
import path from 'path'
import { isEmpty } from '../common/utils'

const PARAMS_PATH = path.join(__dirname, '../db/auth-params.json')

export default class AuthParams {
	constructor (hash) {
		this.hash = hash
		// 合并参数
		const params = this.getAuthParams()
		// 判断是否存在
		if (isEmpty(params)) params.notExist = true
		// 合并属性
		Object.assign(this, params)
	}

	// 获取授权参数信息
	getAuthParams () {
		const authParams = JSON.parse(fs.readFileSync(PARAMS_PATH))
		return authParams[this.hash] || {}
	}

	// 更新App信息
	updateAuthParams (value) {
		const authParams = JSON.parse(fs.readFileSync(PARAMS_PATH))
		authParams[this.hash] = value

		fs.writeFileSync(PARAMS_PATH, JSON.stringify(authParams, null, 4))
	}
}
