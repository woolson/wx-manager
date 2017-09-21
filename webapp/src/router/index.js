import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import { setTitle } from 'src/common/utils'

Vue.use(Router)

const config = [
	{ path: '', name: 'home' },
	{ path: '/article', name: 'article' },
]

const routes = [
	...parseRoute(config),
	{
		path: '*',
		component: resolve => require(['../pages/not-found/index.vue'], resolve),
	},
]

// 用于解析路由配置
function parseRoute (items) {
	return items.map(item => {
		const path = item.path.replace(/(:|\?)\w+$/g, '')
		console.log(path);
		const result = {
			path,
			name: item.name,
			component: resolve => require([`../pages${path}/index.vue`], resolve),
		}

		return result
	})
}

const RootRouter = new Router({
	mode: 'history',
	routes,
})

RootRouter.beforeEach((to, from, next) => {
	iView.LoadingBar.start()
	const titleMap = {
		home: '主页',
		article: '图文',
	}
	// 切换页面修改title
	setTitle(titleMap[to.name])
	next()
})

RootRouter.afterEach((to, from, next) => {
	iView.LoadingBar.finish()
})

export default RootRouter
