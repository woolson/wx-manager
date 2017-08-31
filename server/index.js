var express = require('express')
var bodyParser = require('body-parser')
var routes = require('./routes/index')
var config = require('./config')
var app = express()

var SERVER_PORT = 8080

app.use(express.static('web'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// 加载接口
routes(app)

app.listen(SERVER_PORT)
console.log('Server start at: ', SERVER_PORT)
