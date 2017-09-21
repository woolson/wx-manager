<template lang="pug">
ul.media-list
	li.media-list__title {{title}}
	li.media-list__item(v-for="item in list")
		div.media-list__item__image
			img(:src="item.data.url")
		div.media-list__item__content
			h3 {{item.name}}
			a(target="_blank" v-show="item.data.media_id")
				span {{item.data.media_id}}
				span(
					v-clipboard="item.data.media_id"
					@success="copySucessFu"
				) 点击复制
			a(target="_blank" v-show="item.data.url")
				span {{item.data.url}}
				span(
					v-clipboard="item.data.url"
					@success="copySuccessFn"
				) 点击复制
</template>

<script>
export default {
	name: 'list',

	props: ['list', 'title'],

	methods: {
		copySuccessFn: require('src/common/utils').copySuccessFn,
	},
}
</script>

<style lang="stylus" scoped>
.media-list
	margin-top 1rem
	border $border-default
	border-radius .25rem

.media-list__title
	padding .5rem
	font-size .8rem
	font-weight bold

.media-list__item
	padding .5rem
	display flex
	border-top: $border-default

.media-list__item__image
	width: 5rem
	margin-right: .5rem
	img
		width: 100%

.media-list__item__content
	h3
		margin-bottom: .5rem
	a
		display  block
		span:first-child
			display: inline-block
			color $color-main
			max-width 400px
			text-overflow: ellipsis
			overflow: hidden
			white-space: nowrap
			vertical-align: middle
		span:last-child
			color $color-blue
			margin-left .5rem
			text-decoration underline
		&:last-child
			span
				text-decoration underline
</style>
