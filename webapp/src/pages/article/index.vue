<template lang="pug">
div.article
	h2 文章列表
	div
		Button(type="info" @click="fetchArtile") 查询图文
		Button(type="success" class="u-ml10") 添加图文
	ul.article__list
		li(v-for="article in articles")
			img(:src="article.thumb_url")
			div
				h3 {{article.title}}
				p
					span {{article.media_id}}
					span(v-clipboard="article.media_id" class="u-mr10") 点击复制
				p {{article.create_time}}
</template>

<script>
import iView from 'iview'

export default {
	data () {
		return {
			articles: [],
		}
	},

	methods: {
		fetchArtile () {
			this.$get('/api/article/getAll')
				.then(data => this.articles = data)
		},
	},
}
</script>

<style lang="stylus" scoped>
.article
	padding: 1rem 0
	max-width: 900px
	margin: 0 auto
	h2
		margin-bottom: 1rem
</style>
