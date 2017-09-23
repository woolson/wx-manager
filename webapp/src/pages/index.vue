<template lang="pug">
div.home
	div
		i.wm-weixin1.wm
		p 微信素材管理
</div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
.home
	div
		background: white
		text-align: center
		width: 500px
		margin 1rem auto
		padding 1rem
		display flex
		flex-direction: column
		border-radius .25rem
		box-shadow 0 0 .5rem rgba(black, .05)
		i
			font-size: 10rem
			color $color-green
		p
			font-size: 2rem
</style>
