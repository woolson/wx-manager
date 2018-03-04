import KoaRouter from 'koa-router'
import config from '../db/config'
import * as Setting from '../controller/setting'

const router = KoaRouter()

router.prefix(`${config.appPath}/article`)
// 获取所有app
router.get('/getAll', Setting.getAppList)

// router.get('/logs/:name', PagesCtrl.getLogDetail)

export default router

// var request = require('request')
// var Token = require('../common/token')
// var utils = require('../common/utils')
// var assign = require('object-assign')
//
// // add article info
// module.exports = function (app) {
// 	app.post('/wx-manager/api/article/add', function(req, res, next) {
// 		var params = req.body
//
// 		if(!utils.isEmpty(params)) {
// 			Token.getToken(function(token) {
// 				var url = 'https://api.weixin.qq.com/cgi-bin/material/add_news'
// 				var data = {
// 					articles: [
// 						params,
// 					],
// 				}
// 				request.post({
// 					url: `${url}?access_token=${token}`,
// 					headers: {
// 						contentType: 'application/json; charset=utf-8',
// 					},
// 					form: JSON.stringify(data),
// 				}, function(err, response, body) {
// 					var resInfo = JSON.parse(body)
// 					if (!resInfo.errcode) {
// 						res.send({
// 							msg: '添加成功',
// 							success: true,
// 							data: resInfo,
// 						})
// 					} else {
// 						res.send({
// 							msg: resInfo,
// 							success: false,
// 						})
// 					}
// 				})
// 			})
// 		} else {
// 			res.send({
// 				msg: '请填写参数',
// 				success: false,
// 			})
// 		}
// 	})
//
// 	app.get('/wx-manager/api/article/getAll', function(req, res, next) {
// 		var params = req.body || {}
// 		var type = params.type || 'news'
//
// 		Token.getToken(function(token) {
// 			var url = 'https://api.weixin.qq.com/cgi-bin/material/batchget_material'
// 			var data = {
// 				access_token: token,
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
//
// 				if(!data.errmsg) {
// 					const list = data.item.map(function(item) {
// 						return assign({
// 							media_id: item.media_id,
// 							create_time: utils.dateFormat(item.content.create_time),
// 							update_time: utils.dateFormat(item.content.update_time),
// 						}, item.content.news_item[0])
// 					})
// 					res.send({
// 						msg: '成功',
// 						success: true,
// 						data: list,
// 					})
// 				} else {
// 					res.send({
// 						msg: data.errmsg,
// 						success: false,
// 					})
// 				}
// 			})
// 		})
// 	})
// }
