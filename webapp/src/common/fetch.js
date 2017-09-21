import axios from 'axios'
import iView from 'iview'
import { obj2Params } from 'src/common/utils'

export const post = (url, data, options) => {
	return common('POST', url, data, options)
}

export const get = (url, data, options) => {
	return common('GET', url, data, options)
}

const common = (type, url, data, options = {}) => {
	var config = {
		method: type,
		cache: options.cache === undefined ? false : options.cache,
		dataType: 'json',
		timeout: options.timeout,
		withCredentials: true,
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

	if (!options.disableLoading) {
		// 添加loading
		iView.LoadingBar.start()
	}

	return axios(config).then(resData => {
		if (resData.success) return resData.data || {}
		else {
			const error = {
				errorMessage: resData.msg,
				error: true,
			}
			return Promise.reject(error)
		}
	})
}

axios.interceptors.request.use(function (config) {
	return config
}, function (error) {
	// Do something with request error
	return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
	// 关闭loading
	iView.LoadingBar.finish()

	return response.data || {}
}, function (error) {
	// 关闭loading
	iView.LoadingBar.finish()

	if (error.message) Toast(error.message)
	return Promise.reject(error)
})

// 全局绑定
function install (Vue) {
	Object.defineProperty(Vue.prototype, '$get', {
		get: () => get,
	})
	Object.defineProperty(Vue.prototype, '$post', {
		get: () => post,
	})
	Object.defineProperty(Vue.prototype, '$fetch', {
		get: () => common,
	})
}

export default install
