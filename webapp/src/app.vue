<template lang="pug">
div#app
	Menu(
		mode="horizontal"
		theme="dark"
		:active-name="currentPage"
		@on-select="changePages"
	)
		div.layout-nav
			MenuItem(name="0")
				Icon(type="ios-home")
				span 主页
			MenuItem(name="1")
				Icon(type="android-list")
				span 图文
			MenuItem(name="2")
				Icon(type="images")
				span 媒体
			MenuItem(name="3")
				Icon(type="settings")
				span 设置
	router-view
</template>

<script>
const PATH = [
	'/',
	'/article',
	'/media',
	'/setting',
]

export default {
	computed: {
		currentPage () {
			const path = this.$route.path
			if(path === '/') return '0'
			const index = PATH.findIndex(o => {
				if(o === '/') return false
				return path.indexOf(o) !== -1
			})
			return index + ''
		},
	},

	methods: {
		changePages (page) {
			this.$router.push(PATH[page])
		},
	},
}
</script>

<style lang="stylus" scoped>
.ivu-menu
	display: flex
	justify-content: center

.layout-nav
	display inline-block

#app
	background: $color-bg
	min-width: 360px

@media screen and (max-width: 760px)
	#app
		.common-block
			padding .8rem
			margin .5rem !important

@media screen and (min-width: 760px)
	#app
		.common-block
			max-width 760px
</style>
