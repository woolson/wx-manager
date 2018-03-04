import fs from 'fs'
import path from 'path'
import Configer from '../model/configer'
import WeChat from '../model/wechat'
import { isEmpty } from '../common/utils'
import { TokenDB } from '../db'
import { post } from '../common/fetch'

const APPS_PATH = path.join(__dirname, '../db/apps.json')

export async function getAppList (ctx, next) {
	const { query } = ctx.request
	const apps = JSON.parse(fs.readFileSync(APPS_PATH))
	ctx.body = Object.keys(apps).map(item => {
		const { name, appId } = apps[item]
		return { name, appId, checked: appId === ctx.cookies.get('appId') }
	})
}

export async function setApp (ctx, next) {
	const { body } = ctx.request
	const options = {
		httpOnly: true,
	}
	ctx.cookies.set('appId', body.appId, options)
	ctx.body = body.appId
}

export async function addApp (ctx, next) {
	const {
		appId,
		appSecret,
		name,
		password,
		redirect,
		ipWhiteList,
	} = ctx.request.body || {}

	if (password === 'woolsonlee' && name && appId && appSecret) {
		const wxApp = new Configer({appId})
		if (isEmpty(wxApp.appConf)) {
			const newApp = { appId, appSecret, name }
			// 默认值
			if (!redirect) newApp.redirect = ''
			if (!ipWhiteList) newApp.ipWhiteList = []
			// 插入配置
			wxApp.updateConfig(newApp)
			// 数据库添加token
			TokenDB.saveSync(newApp)
			ctx.body = '添加公众号成功'
		} else throw new Error('该appId配置已存在')
	} else {
		throw new Error('请填写添加密码和必填项[name, appId, appSecret]')
	}
}

export async function deleteApp (ctx, next) {
	const { appId } = ctx.request.query

	if (appId) {
		const wxApp = new Configer({appId})
		wxApp.deleteConfig(appId)
		TokenDB.removeSync({appId})
		ctx.body = '删除公众号成功'
	} else {
		throw new Error('需要删除的AppId不可为空')
	}
}

export async function resetApp (ctx, next) {
	const url = 'https://api.weixin.qq.com/cgi-bin/clear_quota'
	const appId = ctx.cookies.get('appId')
	const wxApp = new WeChat({appId})
	const params = { appid: appId }
	const token = await wxApp.getAccessToken()
	await post(`${url}?access_token=${token}`, params)
	ctx.body = true
}
