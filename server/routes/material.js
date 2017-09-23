var request = require('request')
var Token = require('../common/token')
var utils = require('../common/utils')

// add article info
module.exports = function (app) {
	app.get('/api/material/get', function(req, res, next) {
		var params = req.query || {}
		var type = params.type || 'news'

		Token.getToken(function(token) {
			var url = 'https://api.weixin.qq.com/cgi-bin/material/batchget_material'
			var data = {
				type: type,
				offset: 0,
				count: 20,
			}

			request.post({
				url: `${url}?access_token=${token}`,
				headers: {
					contentType: 'application/json; charset=utf-8',
				},
				form: JSON.stringify(data),
			}, function(err, response, body) {
				var data = JSON.parse(body)
				if(!data.errcode) {
					res.send({
						msg: '成功',
						success: true,
						data,
					})
				}else {
					res.send({
						msg: data.errmsg,
						success: false,
					})
				}
			})
		})
	})
}
