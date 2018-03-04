import axios from 'axios'
import { obj2Params } from './utils'

export const post = (url, data, options) => {
	return common('POST', url, data, options)
}

export const get = (url, data, options) => {
	return common('GET', url, data, options)
}

export const common = (type, url, data, options = {}) => {
	var config = {
		method: type,
		dataType: 'json',
		headers: {
			'content-type': 'application/json;charset=utf-8',
		},
	}

	if (type.toLowerCase() === 'get') {
		const params = data ? obj2Params(data) : '{}'
		config.url = `${url}?${params}`
	} else {
		config.url = url
		config.data = data || {}
	}

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
