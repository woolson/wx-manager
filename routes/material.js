import KoaRouter from 'koa-router'
import config from '../db/config'
import * as Material from '../controller/material'

const router = KoaRouter()

router.prefix(`${config.appPath}/material`)
// 获取所有素材
router.get('/get', Material.getAll)
// 添加素材
router.post('/add', Material.add)

export default router
// var request = require('request')
// var Token = require('../common/token')
// var utils = require('../common/utils')
//
// // add article info
// module.exports = function (app) {
// 	app.get('/wx-manager/api/material/get', function(req, res, next) {
// 		var params = req.query || {}
// 		var type = params.type || 'news'
//
// 		Token.getToken(function(token) {
// 			var url = 'https://api.weixin.qq.com/cgi-bin/material/batchget_material'
// 			var data = {
// 				type: type,
// 				offset: 0,
// 				count: 20,
// 			}
//
// 			request.post({
// 				url: `${url}?access_token=${token}`,
// 				headers: {
// 					contentType: 'application/json; charset=utf-8',
// 				},
// 				form: JSON.stringify(data),
// 			}, function(err, response, body) {
// 				var data = JSON.parse(body)
// 				if(!data.errcode) {
// 					res.send({
// 						msg: '成功',
// 						success: true,
// 						data,
// 					})
// 				}else {
// 					res.send({
// 						msg: data.errmsg,
// 						success: false,
// 					})
// 				}
// 			})
// 		})
// 	})
// }
