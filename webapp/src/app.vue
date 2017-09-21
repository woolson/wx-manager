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
				Icon(type="ios-navigate")
				span 文章
			MenuItem(name="1")
				Icon(type="ios-keypad")
				span 媒体
	router-view
</template>

<script>
const PATH = [
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
			return PATH.findIndex(item => this.$route.path.indexOf(item) !== -1) + ''
		}
	},

	methods: {
		changePages (page) {
			this.$router.push(PATH[page])
		}
	}
}
</script>
