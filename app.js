import path from 'path'
import Koa from 'koa'
import views from 'koa-views'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import koaLogger from 'koa-logger'

// import imageRoute from './routes/images'
// import materialRoute from './routes/material'
// import articleRoute from './routes/articles'
import settingRoute from './routes/setting'
// import wechatRoute from './routes/wechat'
import { reqFilter } from './global'

const app = new Koa()

app.use(bodyparser({
	enableTypes: ['json', 'form', 'text'],
}))
app.use(json({pretty: false}))
app.use(koaLogger())
app.use(require('koa-static')(path.join(__dirname, 'public')))
app.use(views(path.join(__dirname, 'views'), {
	extension: 'pug',
}))

// 权限验证和错误处理中间件, 后端报错不不返回500
app.use(reqFilter)

// routes
// app.use(imageRoute.routes(), imageRoute.allowedMethods())
// app.use(materialRoute.routes(), materialRoute.allowedMethods())
// app.use(articleRoute.routes(), articleRoute.allowedMethods())
app.use(settingRoute.routes(), settingRoute.allowedMethods())

module.exports = app
