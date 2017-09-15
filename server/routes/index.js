var articles = require('./articles')
var images = require('./images')
var material = require('./material')

module.exports = function (app) {
	articles(app)
	images(app)
	material(app)
}
