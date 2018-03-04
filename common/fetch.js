import axios from 'axios'
import { obj2Params, getType } from './utils'

export const post = (url, data, options) => {
	return common('POST', url, data, options)
}

export const get = (url, data, options) => {
	return common('GET', url, data, options)
}

export const common = (type, url, data, options = {}) => {
	if (getType(url) === 'object') {
		const request = url
		url = request.url
		data = request.data
		options = request.options || {}
	}
	// 设置默认值
	options = Object.assign({
		// 显示loading
		process: true,
		// 超时时间
		timeout: null,
		headers: {
			'content-type': 'application/json;charset=utf-8',
		},
	}, options)

	var config = {
		url: url,
		method: type,
		dataType: 'json',
		headers: options.headers,
	}

	if (type.toLowerCase() === 'get') config.params = data
	else config.data = data

	return axios(config).then(resData => {
		const data = resData.data || {}
		if (!data.errcode) {
			return data
		} else {
			const error = {
				error: data,
				status: 0,
			}
			return Promise.reject(error)
		}
	})
}
