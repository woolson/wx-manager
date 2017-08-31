var express = require('express')
var bodyParser = require('body-parser')
var routes = require('./routes/index')
var app = express()

app.use(express.static('web'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// 加载接口
routes(app)

app.listen(8080)
