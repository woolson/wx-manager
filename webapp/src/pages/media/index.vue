<template lang="pug">
div.media
	h2 媒体列表
	div
		Button(type="info" @click="fetchArtile") 查询媒体
		Button(type="success" @click="$router.push('/media/add')" class="u-ml10") 添加媒体
</template>

<script>
export default {
	data () {
		return {

		}
	},
}
</script>

<style lang="stylus">
.media
	padding 1rem 0
	max-width 900px
	margin 0 auto
	h2
	> div
		margin-bottom 1rem
		margin-bottom 1rem
</style>
