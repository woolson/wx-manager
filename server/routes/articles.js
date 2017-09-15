var request = require('request')
var getToken = require('../common/token')
var utils = require('../common/utils')

// add article info
module.exports = function (app) {
	app.post('/api/article/add', function(req, res, next) {
		var params = req.body

		if(!utils.isEmpty(params)) {
			getToken(function(token) {
				var url = 'https://api.weixin.qq.com/cgi-bin/material/add_news'
				var data = {
					articles: [
						params,
					],
				}
				request.post({
					url: `${url}?access_token=${token}`,
					headers: {
						contentType: 'application/json; charset=utf-8',
					},
					form: JSON.stringify(data),
				}, function(err, response, body) {
					var resInfo = JSON.parse(body)
					if(!resInfo.errcode) {
						res.send({
							msg: '添加成功',
							data: resInfo,
						})
					}else res.send(resInfo)
				})
			})
		} else res.send({msg: '请填写参数'})
	})

	app.get('/api/article/getAll', function(req, res, next) {
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
					data: JSON.parse(body),
				})
			})
		})
	})
}
