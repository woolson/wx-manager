<template lang="pug">
div#app
	Menu(
		mode="horizontal"
		theme="dark"
		:active-name="currentPage"
		@on-select="changePages"
	)
		div.layout-logo
		div.layout-nav
			MenuItem(name="0")
				Icon(type="ios-home")
				span 主页
			MenuItem(name="1")
				Icon(type="document")
				span 文章
			MenuItem(name="2")
				Icon(type="images")
				span 媒体
	router-view
</template>

<script>
const PATH = [
	'/',
	'/article',
	'/media',
]

export default {
	data () {
		return {
		}
	},

	computed: {
		currentPage () {
			return PATH.findIndex(item => {
				if(this.$route.path === '/') return true
				else this.$route.path.indexOf(item) !== -1
			}) + ''
		}
	},

	methods: {
		changePages (page) {
			this.$router.push(PATH[page])
		}
	}
}
</script>
