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
				Icon(type="document")
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
			if(this.$route.path === '/') return '0'
			return PATH.indexOf(this.$route.path) + ''
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
	.article
	.media
	.setting
		padding .8rem
		margin .5rem
		border-radius .25rem
		background: white
		box-shadow 0 0 .8rem rgba(black, .05)
		margin .5rem auto

@media screen and (max-width: 760px)
	#app > div
		padding .8rem
		margin .5rem !important

@media screen and (min-width: 760px)
	#app > div
		max-width 760px
</style>
