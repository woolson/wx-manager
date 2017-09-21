var request = require('request')
var getToken = require('../common/token')
var utils = require('../common/utils')

// add article info
module.exports = function (app) {
	app.post('/api/material/get', function(req, res, next) {
		var params = req.body || {}
		var type = params.type || 'news'

		getToken(function(token) {
			var data = {
				type: type,
				offset: 0,
				count: 20,
			}

			request.post({
				url: `https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=${token}`,
				headers: {
					contentType: 'application/json; charset=utf-8',
				},
				form: JSON.stringify(data),
			}, function(err, response, body) {
				res.send({
					msg: '成功',
					success: true,
					data: JSON.parse(body),
				})
			})
		})
	})
}
