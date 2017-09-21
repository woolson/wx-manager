module.exports = {
	parseUrl: parseUrl,
	obj2Params: obj2Params,
	getType: getType,
	getTimeStamp: getTimeStamp,
	isEmpty: isEmpty,
	dateFormat: dateFormat,
}

function getTimeStamp () {
	var time = new Date().getTime()
	return {
		second: parseInt(time / 1000),
		mSecond: time,
	}
}

function isEmpty (value) {
	const type = getType(value)

	switch (type) {
		case 'object':
			return Object.keys(value).length === 0
		case 'array':
			return value.length === 0
		case 'number':
			return !isNaN(value)
		default:
			return !!value
	}
}

// parse params in current href
function parseUrl (url) {
	url = url || location.href

	const splitUrl = url.split('?')
	const [link, params] = splitUrl

	if(params) {
		const result = {url: link}
		const _params = params.split('&')
		_params.forEach(item => {
			const [name, key] = item.split('=')
			result[name] = decodeURIComponent(key)
		})
		return result
	}else {
		return null
	}
}

// object to params
// use {name: 'woolson', msg: 'hello'} => name=woolson&msg=hello
function obj2Params(data) {
	var dataType = getType(data)

	if(dataType !== 'object') {
		console.error('function obj2Params receive a nonsupport type parameter.');
		return
	}

	return resolveObj(data).join('&')
}

function resolveObj(obj, parents) {
	var result = []
	var parentsStr = ''

	if(parents) parentsStr = parents.join('.') + '.'
	else parents = []

	Object.keys(obj).forEach(function(key) {
		switch (getType(obj[key])) {
			case 'object':
				var insetObj = resolveObj(obj[key], parents.concat([key]))
				result = result.concat(insetObj)
				break
			case 'array':
				result.push(parentsStr + key + '=' + obj[key].join())
				break
			default:
				result.push(parentsStr + key + '=' + obj[key])
				break
		}
	})
	return result
}

// get type of value, .e.g: 'string', 'object', 'number', 'null', 'undefined'
function getType(value) {
	var typer = Object.prototype.toString
	var typeStr = typer.call(value)

	typeStr = typeStr.replace(/.*\s(\w+)\]/g, '$1')
	return typeStr.toLowerCase()
}

function dateFormat (date, template) {
	if(!isNaN(date) && date / 1000000000000 < 1) {
		date = date * 1000
	}

	var tmp =  template || 'YYYY-MM-DD'
	var newDate = new Date(date)
	var fullYear = newDate.getFullYear()
	var year = String(fullYear).substr(2)
	var month = newDate.getMonth() + 1
	var monthWithZero = ('0' + month).substr(-2)
	var day = newDate.getDate()
	var dayWithZero = ('0' + day).substr(-2)

	var items = [
		{ key: 'YYYY', value: fullYear },	// 2017年
		{ key: 'YY', value: year },			// 17年
		{ key: 'MM', value: monthWithZero },// 02月
		{ key: 'mm', value: month },		// 02月
		{ key: 'DD', value: dayWithZero },	// 02月
		{ key: 'dd', value: day },// 02月
	]

	items.forEach(item => {
		tmp = tmp.replace(item.key, item.value)
	})

	return tmp
}
