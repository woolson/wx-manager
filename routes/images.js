var request = require('request')
var multer = require('multer')
var path = require('path')
var fs = require('fs')
var Token = require('../common/token')
var utils = require('../common/utils')
var upload = multer({dest: './images/'})

// upload images list
module.exports = function (app) {
	app.post('/wx-manager/api/image/add', upload.fields([{name: 'media'}]), function(req, res, next) {
		var isForever = req.body.forever ? req.body.forever === 'true' : false
		var files = req.files || {}
		var images = files.media || []
		var result = { data: [] }

		images.forEach(function(image) {
			var filePath = path.resolve(__dirname, `../../${image.path}`)

			Token.getToken(function(token) {
				var url = 'https://api.weixin.qq.com/cgi-bin/media/uploadimg'
				var requestParam = {
					url: `${url}?access_token=${token}`,
					headers: {
						"Content-Type": "multipart/form-data",
					},
					formData: {
						access_token: token,
						media: {
							value: fs.createReadStream(filePath),
							options: {
								filename: image.originalname,
								filelength: image.size,
								contentType: image.mimetype,
								fieldname: image.fieldname,
							},
						},
					}
				}
				if(isForever) {
					requestParam.formData.type = 'thumb'
					requestParam.url = 'https://api.weixin.qq.com/cgi-bin/material/add_material'
				}

				// call wechat api
				request.post(requestParam, function(err, response, body) {
					var resInfo = JSON.parse(body)

					if(!resInfo.errcode) {
						resInfo.url = resInfo.url.replace(/\\/g, "")
						resInfo.name = image.originalname
						result.data.push(resInfo)
					}else {
						result.data.push({
							name: image.originalname,
							errorMsg: resInfo.errmsg,
							errorCode: resInfo.errcode,
						})
					}
					// response request when all images uploaded
					if(result.data.length === images.length) {
						result.success = true
						res.send(result)
					}
				})
			})
		})
	})

	app.get('/wx-manager/api/image/remove', function(req, res, next) {
		res.send({
			msg: 'comming soon',
			success: false,
		})
	})
}
