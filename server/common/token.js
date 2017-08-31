var request = require('request')
var path = require('path')
var fs = require('fs')
var utils = require('./utils')

module.exports = function (callback) {
	var token = require('./token.json') || {}
	var currTime = utils.getTimeStamp().second
	var isExpired = !token.timestamp || currTime - token.timestamp > 7100

	if(isExpired) {
		// 这样可以热更新
		var config = require('./config')
		var param = {
			grant_type: 'client_credential',
			appid: config.appId,
			secret: config.appSecret,
		}
		var paramStr = utils.obj2Params(param)
		var url = `https://api.weixin.qq.com/cgi-bin/token?${paramStr}`
		request(url, function(err, res, body) {
			// 记录获取token时间，两小时后过期重取
			var newToken = {
				value: JSON.parse(body).access_token,
				timestamp: utils.getTimeStamp().second,
			}
			var filePath = path.join(__dirname, 'token.json')
			console.log(filePath);
			fs.writeFileSync(filePath, JSON.stringify(newToken))
			callback(newToken.value)
		})
	}else callback(token.value)
}
