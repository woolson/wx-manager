import Wechat from './model/wechat'
import Authorize from './model/authorize'
import { logger, getType, has } from './common/utils'

const NEED_AUTH = ['wechat']
const IS_PRO = process.env.NODE_ENV !== 'development'

// 请求权限验证和记录
export async function reqFilter (ctx, next) {
	try {
		const { url } = ctx.request
		const urlPrefix = url.split('/')[1]

		// 某些接口需要验证
		if (!IS_PRO && IS_PRO && NEED_AUTH.indexOf(urlPrefix) !== -1) {
			const authorize = new Authorize(ctx)
			const isSafe = authorize.isIpSafe()

			if (!isSafe) {
				throw new Error('您的服务器IP不存在于微信接口服务的白名单中')
			}
		}

		if (!has(url, '/app/') && !ctx.cookies.get('appId')) {
			throw new Error('请先设置app')
		}

		// 测试记录请求记录
		if (!IS_PRO) {
			// 记录请求信息
			logger.info(`${ctx.method} ${ctx.url}`)
			if (ctx.method === 'POST') {
				logger.info(`Request data: ${JSON.stringify(ctx.request.body)}`)
			}
		}

		await next()

		const { status } = ctx.response

		switch (true) {
			// 页面404
			case status === 404:
				throw new Error('404 请求资源不存在')
			// 非页面统一返回结构
			case urlPrefix !== 'pages':
				ctx.body = {
					data: ctx.body,
					success: true,
				}
		}
	} catch (e) {
		// e有两种,一种是throw的异常，一种是微信接口返回的错误
		const isErrType = getType(e) === 'error'
		const err = isErrType ? e.stack.toString() : e

		// 如果返回的错误信息是Accesstoken过期则刷新一下
		if (!isErrType && e.errcode === 40001) {
			const { query } = ctx.request
			if (query.appId) {
				const app = new Wechat({appId: query.appId})
				const newToken = await app.fetchToken()
				console.log(`AccessToken已过期，更新成功：${newToken}`)
			}
		}
		// 打印或保存log
		if (IS_PRO) logger.error(`server error: ${err}`)
		else console.error(err)
		// 统一错误返回信息
		ctx.body = {
			success: false,
			error: err,
		}
	}
}
