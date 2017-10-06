var fs = require('fs')
var path = require('path')
var request = require('request')
var Token = require('../common/token')
var utils = require('../common/utils')
var configPath = path.join(__dirname, '../common/config.json')
var appsPath = path.join(__dirname, '../common/apps.json')

module.exports = function (app) {
	app.get('/wx-manager/api/app/get', function(req, res) {
		var currentApp = JSON.parse(fs.readFileSync(configPath))
		var apps = JSON.parse(fs.readFileSync(appsPath))
		var params = {
			msg: '成功',
			success: true,
			data: apps.map(o => {
				return {
					inUse: o.appId === currentApp.appId,
					id: o.id,
					name: o.name,
					appId: o.appId,
				}
			}),
		}
		res.send(params)
	})

	app.post('/wx-manager/api/app/set', function(req, res) {
		var data = req.body
		var apps = JSON.parse(fs.readFileSync(appsPath))
		var appInfo = apps[data.id]
		fs.writeFileSync(configPath, JSON.stringify(appInfo))
		Token.updateToken()
		res.send({
			success: true,
			msg: '成功',
		})
	})

	app.post('/wx-manager/api/app/add', function(req, res) {
		var data = req.body
		var apps = JSON.parse(fs.readFileSync(appsPath))
		data.id = apps.length
		apps.push(data)
		fs.writeFileSync(appsPath, JSON.stringify(apps))
		res.send({
			success: true,
			msg: '成功',
		})
	})

	app.post('/wx-manager/api/app/delete', function(req, res) {
		var index = req.body.index
		var apps = JSON.parse(fs.readFileSync(appsPath))
		apps.splice(index, 1)
		fs.writeFileSync(appsPath, JSON.stringify(apps))
		res.send({
			success: true,
			msg: '成功',
		})
	})

	app.post('/wx-manager/api/app/clear', function(req, res) {
		Token.getToken(function(token) {
			var url = 'https://api.weixin.qq.com/cgi-bin/clear_quota'
			var params = {
				appid: JSON.parse(fs.readFileSync(configPath)).appId,
			}
			var requestParam = `${url}?access_token=${token}`
			request.post({
				url: requestParam,
				headers: {
					contentType: 'application/json; charset=utf-8',
				},
				form: JSON.stringify(params),
			}, function(err, response, body) {
				var data = JSON.parse(body)
				console.log(data)
				if(!data.errcode) {
					res.send({success: true, msg: '成功'})
				}else {
					res.send({success: false, msg: data.errmsg})
				}
			})
		})
	})
}
