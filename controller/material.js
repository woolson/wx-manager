import fs from 'fs'
import Request from 'request-promise-native'
import Wechat from '../model/wechat'
import { post } from '../common/fetch'

export async function getAll (ctx, next) {
	const url = 'https://api.weixin.qq.com/cgi-bin/material/batchget_material'
	const appId = ctx.cookies.get('appId')
	const wxApp = new Wechat({appId})
	const token = await wxApp.getAccessToken()
	const params = {
		type: ctx.request.query.type,
		offset: 0,
		count: 20,
	}

	ctx.body = await post(`${url}?access_token=${token}`, params)
}

export async function add (ctx, next) {
	const appId = ctx.cookies.get('appId')
	const wxApp = new Wechat({appId})
	const token = await wxApp.getAccessToken()
	const result = []

	const { fields, files } = ctx.request.body

	ctx.body = await new Promise((resolve, reject) => {
		Array.from(files.media).forEach(async function (image) {
			const url = 'https://api.weixin.qq.com/cgi-bin/media/uploadimg'
			const request = {
				url: `${url}?access_token=${token}`,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				formData: {
					access_token: token,
					media: {
						value: fs.createReadStream(image.path),
						options: {
							filename: image.name,
							filelength: image.size,
							contentType: image.mimetype,
							fieldname: image.fieldname,
						},
					},
				},
			}

			if (fields.forever === 'true') {
				request.formData.type = 'thumb'
				request.url = `https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${token}`
			}

			const uploadResult = JSON.parse(await Request.post(request))

			if (!uploadResult.errcode) {
				uploadResult.url = uploadResult.url.replace(/\\/g, '')
				uploadResult.name = image.name
				result.push(uploadResult)
			} else {
				result.push({
					name: image.originalname,
					errorMsg: uploadResult.errmsg,
					errorCode: uploadResult.errcode,
				})
			}
			// response request when all images uploaded
			if (result.length === files.media.length) resolve(result)
		})
	})
}
