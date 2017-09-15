var request = require('request')
var multer = require('multer')
var path = require('path')
var fs = require('fs')
var getToken = require('../common/token')
var utils = require('../common/utils')
var upload = multer({dest: './images/'})

// upload images list
module.exports = function (app) {
	app.post('/api/image/add', upload.fields([{name: 'media'}]), function(req, res, next) {
		var isForever = req.body.forever ? req.body.forever === 'true' : false
		var files = req.files || {}
		var images = files.media || []
		var result = []

		images.forEach(function(image) {
			var filePath = path.resolve(__dirname, `../../${image.path}`)

			getToken(function(token) {
				var params = {
					access_token: token,
				}
				var requestParam = {
					url: 'https://api.weixin.qq.com/cgi-bin/media/uploadimg?' + utils.obj2Params(params),
					headers: {
						"Content-Type": "multipart/form-data",
					},
					formData: {
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
					params.type = 'thumb'
					requestParam.url = 'https://api.weixin.qq.com/cgi-bin/material/add_material?' + utils.obj2Params(params)
				}

				// call wechat api
				request.post(requestParam, function(err, response, body) {
					var resInfo = JSON.parse(body)

					if(!resInfo.errcode) {
						resInfo.url = resInfo.url.replace(/\\/g, "")
						result.push({
							name: image.originalname,
							data: resInfo,
						})
					}else {
						result.push({
							name: image.originalname,
							errorMsg: resInfo.errmsg,
							errorCode: resInfo.errcode,
						})
					}
					// response request when all images uploaded
					if(result.length === images.length) res.send(result)
				})
			})
		})
	})

	app.get('/api/image/remove', function(req, res, next) {
		res.send('comming soon')
	})
}
