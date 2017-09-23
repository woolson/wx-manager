<template lang="pug">
div.article.common-block
	h2 图文列表
	div
		Button(
			type="info"
			shape="circle"
			size="small"
			@click="fetchArtile"
		) 查询图文
		Button(
			type="success"
			class="u-ml10"
			shape="circle"
			size="small"
			@click="$router.push('/article/add')"
		) 添加图文
	ul.article__list(v-show="articles !== null && articles.length !== 0")
		li(v-for="article in articles")
			h3 {{article.title}}
			p.media-id
				span {{article.media_id}}
				span(
					class="u-mr10"
					v-clipboard="article.media_id"
					@success="copySuccessFn"
				) 点击复制
			p.date {{article.create_time}}
	p(v-show="articles && articles.length === 0") 暂无内容
</template>

<script>
import iView from 'iview'
import data from './faker'

export default {
	data () {
		return {
			articles: null,
			copySuccessFn: require('src/common/utils').copySuccessFn,
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
	h2
	> div
		margin-bottom 1rem
		margin-bottom 1rem
	> p
		font-size: 1rem
		text-align: center

.article__list
	border $border-default
	border-radius .25rem
	li
		border-bottom: $border-default
		padding .8rem
		h3
			margin-bottom .5rem
		p
			line-height 1rem
			&.media-id
				span:first-child
					color $color-main
					margin-right 1rem
				span:last-child
					text-decoration underline
					color $color-blue
					cursor pointer
					&:active
						color darken($color-blue, 80%)
					&:visited
						color darken($color-blue, 50%)
					&:hover
						color darken($color-blue, 30%)
			&.date
				color $font-color-gray
		&:last-child
			border-bottom: none
</style>
