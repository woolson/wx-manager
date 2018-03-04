import WeChat from '../model/wechat'
import AuthParams from '../model/auth-params'
import sha1 from 'sha1'
import { post } from '../common/fetch'
import { obj2Params, isEmpty } from '../common/utils'

const ServerHost = 'http://feapi.xsycloud.com.cn'

// 添加图文
export async function add (ctx, next) {
	const { body } = ctx.request

	if (!isEmpty(body)) {
		const wxApp = new WeChat(body)
		const token = await wxApp.getAccessToken()
		const url = 'https://api.weixin.qq.com/cgi-bin/material/add_news'
		const data = {articles: [body]}
		const resInfo = await post(`${url}?access_token=${token}`, data)
		ctx.body = resInfo
	} else throw new Error('请填写完整参数')
}

export async function getAll (ctx, next) {
	// const type = ctx.request.query.type || 'news'

	// var url = 'https://api.weixin.qq.com/cgi-bin/material/batchget_material'
	// var data = {
	// 	access_token: token,
	// 	type: type,
	// 	offset: 0,
	// 	count: 20,
	// }
	// get()
	// request.post({
	// 	url: `${url}?access_token=${token}`,
	// 	headers: {
	// 		contentType: 'application/json; charset=utf-8',
	// 	},
	// 	form: JSON.stringify(data),
	// }, function(err, response, body) {
	// 	var data = JSON.parse(body)
	//
	// 	if(!data.errmsg) {
	// 		const list = data.item.map(function(item) {
	// 			return assign({
	// 				media_id: item.media_id,
	// 				create_time: utils.dateFormat(item.content.create_time),
	// 				update_time: utils.dateFormat(item.content.update_time),
	// 			}, item.content.news_item[0])
	// 		})
	// 		res.send({
	// 			msg: '成功',
	// 			success: true,
	// 			data: list,
	// 		})
	// 	} else {
	// 		res.send({
	// 			msg: data.errmsg,
	// 			success: false,
	// 		})
	// 	}
	// })
}

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
	} else {
		throw new Error('此接口需传参数：appId')
	}
}
