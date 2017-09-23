var request = require('request')
var path = require('path')
var fs = require('fs')
var utils = require('./utils')

module.exports = {
	getToken: function (callback) {
		var tokenPath = path.join(__dirname, './token.json')
		var token = JSON.parse(fs.readFileSync(tokenPath))
		var currTime = utils.getTimeStamp().second
		var isExpired = currTime > token.timestamp

		if(isExpired) fetchToken(callback)
		else callback(token.value)
	},
	updateToken: function (callback) {
		fetchToken(callback)
	},
}

function fetchToken (callback) {
	var configPath = path.join(__dirname, './config.json')
	var config = JSON.parse(fs.readFileSync(configPath))
	var param = {
		grant_type: 'client_credential',
		appid: config.appId,
		secret: config.secret,
	}
	var paramStr = utils.obj2Params(param)
	var url = `https://api.weixin.qq.com/cgi-bin/token?${paramStr}`

	request(url, function(err, res, body) {
		// 记录获取token时间，两小时后过期重取
		var newToken = {
			value: JSON.parse(body).access_token,
			timestamp: utils.getTimeStamp().second + 7200,
		}
		var filePath = path.join(__dirname, 'token.json')
		fs.writeFileSync(filePath, JSON.stringify(newToken))
		callback(newToken.value)
	})
}
