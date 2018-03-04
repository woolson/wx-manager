import Configer from './configer'
import { UserDB, TokenDB } from '../db'
import { get } from '../common/fetch'
import {
	moment,
	logger,
	isEmpty,
	randomStr,
	signParams,
} from '../common/utils'

export default class WeChat extends Configer {
	constructor (appInfo = {}) {
		super(appInfo)
	}

	// 获取基础Access_Token
	async getAccessToken () {
		const { accessToken = {} } = await TokenDB.findOneSync({appId: this.appId})
		const currTime = moment().format('X')
		const isExpired = currTime > accessToken.timestamp || isEmpty(accessToken)
		// token有效性
		logger.info(`AccessToken已过期: ${isExpired ? '是' : '否'}`)
		if (isExpired) {
			const token = await this.fetchToken()
			await TokenDB.updateSync({appId: this.appId}, {
				accessToken: {
					value: token,
					timestamp: moment().format('X') + 7200,
				},
			})
			logger.info(`获取到的新AccessToken: ${token}`)
			return token
		} else return accessToken.value
	}

	// 请求新的基础Access_Token
	fetchToken () {
		const { appId, appSecret } = this.appConf
		const url = `https://api.weixin.qq.com/cgi-bin/token`
		const param = {
			grant_type: 'client_credential',
			appid: appId,
			secret: appSecret,
		}

		return get(url, param).then(data => data.access_token)
	}

	// 由code获取用户信息
	async getUserFromCode (code) {
		const tokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token'
		const tokenParams = {
			appid: this.appConf.appId,
			secret: this.appConf.appSecret,
			code,
			grant_type: 'authorization_code',
		}
		const token = await get(tokenUrl, tokenParams)

		logger.info(`用Code获取用户openId成功. ${JSON.stringify(token)}`)

		const infoUrl = 'https://api.weixin.qq.com/cgi-bin/user/info'
		const infoParams = {
			access_token: await this.getAccessToken(),
			openid: token.openid,
			lang: 'zh_CN',
		}
		// 查询用户信息
		const userInfo = await get(infoUrl, infoParams)
		const savedUser = await UserDB.findSync({openid: userInfo.openid})
		// 标识用户数隶属公众号
		userInfo.appId = this.appId
		// 如果为新用户将信息保存到数据库
		if (savedUser.length === 0) await UserDB.saveSync(userInfo)
		logger.info(`获取用户信息成功. ${JSON.stringify(userInfo)}`)

		return userInfo
	}

	// 获取JS-API ticket, type: jsApi=jsapi 微信卡券=wx_card
	async getTicket (type) {
		const ticketInfo = {
			jsapi: {
				type: 'jsapi',
				saveKey: 'jsApiTicket',
			},
			card: {
				type: 'wx_card',
				saveKey: 'cardTicket',
			},
		}[type] || {}
		const jsApiTicket = await TokenDB.findOneSync({appId: this.appId}).jsApiTicket || {}
		const currTime = moment().format('X')
		const isExpired = currTime > jsApiTicket.timestamp || isEmpty(jsApiTicket)

		if (isExpired) {
			const ticketUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket'
			const ticketParams = {
				access_token: await this.getAccessToken(),
				type: ticketInfo.type,
			}

			const ticket = await get(ticketUrl, ticketParams)
			// 保存ticket
			const updateContent = {}
			updateContent[ticketInfo.saveKey] = {
				value: ticket.ticket,
				timestamp: moment().format('X') + 7200,
			}
			await TokenDB.updateSync({appId: this.appId}, updateContent)

			return ticket.ticket
		} else {
			return jsApiTicket.value
		}
	}

	// 获取签名type可选'card'卡券/'jsapi'js_SDK
	async getSignature (currentUrl, type) {
		const signatureParams = {
			noncestr: randomStr(),
			jsapi_ticket: await this.getTicket(type),
			timestamp: moment().format('X'),
			url: currentUrl,
		}

		return {
			appId: this.appConf.appId,
			timestamp: signatureParams.timestamp,
			nonceStr: signatureParams.noncestr,
			signature: signParams(signatureParams),
		}
	}
}
