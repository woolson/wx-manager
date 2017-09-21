<template lang="pug">
div.not-found
	i.wm.wm-not-found
	p 页面不存在
</template>

<script>
export default {
	name: 'notfound',
}
</script>

<style scoped lang="stylus">
.not-found
	background: #fff
	height: 100vh
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	box-sizing: border-box
	i
		font-size: 5rem
		color: $color-red
	p
		color: #999
		margin: .5rem 0
</style>
