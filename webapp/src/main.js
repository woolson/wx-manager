import Vue from 'vue'
import iView from 'iview'
import App from './app'
import router from './router'
import Fetch from 'src/common/fetch'
import VueClipboards from 'vue-clipboards'

import 'src/common/normalize'
import 'src/common/animation'
import 'src/common/utils.styl'
import 'iview/dist/styles/iview.css'

Vue.use(iView)
Vue.use(Fetch)
Vue.use(VueClipboards)

window.vm = new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App },
})
