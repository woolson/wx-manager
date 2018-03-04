import WeChat from '../model/wechat'
import AuthParams from '../model/auth-params'
import sha1 from 'sha1'
import { obj2Params } from '../common/utils'
import { UserDB } from '../db'

const ServerHost = 'http://feapi.xsycloud.com.cn'

// 由code获取用户信息 query 需包含 {state, code}
export async function getUserInfo (ctx, next) {
	const { query } = ctx.request
	// 在授权之前保存的参数
	const queryParams = new AuthParams(query.state)

	if (queryParams.appId && query.code) {
		const wxApp = new WeChat({appId: queryParams.appId})
		const redirectUrl = wxApp.appConf.redirect
		const userInfo = await wxApp.getUserFromCode(query.code)
		const encodeInfo = encodeURI(obj2Params(Object.assign(userInfo, queryParams)))

		ctx.redirect(`${redirectUrl}?${encodeInfo}`)
	} else {
		throw new Error('此接口需传参数：appId, code')
	}
}

// 通过openId获取用户信息
export async function getUserByOpenId (ctx, next) {
	const { query } = ctx.request

	if (query.openId) {
		ctx.body = await UserDB.findOneSync({openid: query.openId})
	} else {
		throw new Error('此接口需传参数：openId')
	}
}

// 获取签名 JS-API/微信卡券
export async function getSignature (ctx, type) {
	const { query } = ctx.request
	const wxApp = new WeChat(query)

	if (query.appId && query.url) {
		const signature = await wxApp.getSignature(query.url, type)
		return signature
	} else {
		throw new Error('此接口需传参数：appId, url')
	}
}

// 授权入口可以多参数
export function authRedirect (ctx) {
	const { query } = ctx.request

	if (query.appId) {
		const authParamsKey = sha1(JSON.stringify(query)).substring(0, 10)
		const url = 'https://open.weixin.qq.com/connect/oauth2/authorize'
		const params = {
			appid: query.appId,
			redirect_uri: `${ServerHost}/wechat/getUserInfo`,
			response_type: 'code',
			scope: 'snsapi_base',
			state: `${authParamsKey}#wechat_redirect`,
		}
		const authParams = new AuthParams(authParamsKey)

		// 参数键值不存在公众号中
		if (authParams.notExist) {
			authParams.updateAuthParams(query)
		}

		ctx.redirect(`${url}?${obj2Params(params)}`)
	} else ctx.throw(400, '此接口需传参数：appId')
}

// 获取AccessToken
export async function getAccessToken (ctx) {
	const { query } = ctx.request

	if (query.appId) {
		const wxApp = new WeChat(query)
		ctx.body = await wxApp.getAccessToken()
	} else {
		throw new Error('此接口需传参数：appId')
	}
}

// JS-API签名
export async function getJsApiSignature (ctx) {
	ctx.body = await getSignature(ctx, 'jsapi')
}

// ============================= 测试接口 ================================

// 微信卡券签名
export async function getCardSignature (ctx) {
	ctx.body = await getSignature(ctx, 'card')
}

// 获取所有用户
export async function getAllUsers (ctx, next) {
	ctx.body = await UserDB.findSync()
}

// 增加用户
export async function addUser (ctx, next) {
	const { body } = ctx.request

	const addResult = await UserDB.saveSync(body)
	ctx.body = addResult
}

// 删除用户
export async function deleteUser (ctx, next) {
	const { query } = ctx.request
	const deleteResult = await UserDB.removeSync({_id: query.id})

	if (!deleteResult.n) {
		ctx.body = deleteResult.n
	} else {
		throw new Error('用户已删除或用户不存在')
	}
}
