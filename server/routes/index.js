var articles = require('./articles')
var images = require('./images')

module.exports = function (app) {
	articles(app)
	images(app)
}
