import Vue from 'vue'
import Iview from 'iview'
import App from './app'
import router from './router'
import Fetch from 'src/common/fetch'

import 'src/common/normalize'
import 'src/common/animation'
import 'src/common/utils.styl'
import 'iview/dist/styles/iview.css'

Vue.use(Iview)
Vue.use(Fetch)

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App },
})
