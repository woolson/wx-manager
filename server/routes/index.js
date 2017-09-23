var articles = require('./articles')
var images = require('./images')
var material = require('./material')
var setting = require('./setting')
var path = require('path')

module.exports = function (app) {
	articles(app)
	images(app)
	material(app)
	setting(app)

	app.get('*', (req, res) => {
		var indexHtml = path.join(__dirname, '../../web/index.html')
		res.sendFile(indexHtml)
	})
}
