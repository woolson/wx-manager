var fs = require('fs')
var path = require('path')
var configPath = path.join(__dirname, '../common/config.json')
var appsPath = path.join(__dirname, '../common/apps.json')

module.exports = function (app) {
	app.get('/api/app/get', function(req, res) {
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

	app.post('/api/app/set', function(req, res) {
		var data = req.body
		var apps = JSON.parse(fs.readFileSync(appsPath))
		var appInfo = apps[data.id]
		fs.writeFileSync(configPath, JSON.stringify(appInfo))
		res.send({
			success: true,
			msg: '成功',
		})
	})

	app.post('/api/app/add', function(req, res) {
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

	app.post('/api/app/delete', function(req, res) {
		var index = req.body.index
		var apps = JSON.parse(fs.readFileSync(appsPath))
		apps.splice(index, 1)
		fs.writeFileSync(appsPath, JSON.stringify(apps))
		res.send({
			success: true,
			msg: '成功',
		})
	})
}
