<template lang="pug">
div.media
	h2 媒体列表
	div
		Button(type="info" @click="fetchData") 查询媒体
		Button(type="success" @click="$router.push('/media/add')" class="u-ml10") 添加媒体
	Form
		FormItem(label="媒体类型")
			RadioGroup(v-model="type")
				Radio(label="image") 图片
				Radio(label="vedio") 视频
				Radio(label="voice") 声音
	list(:list="list" title="素材列表" v-show="list.length !== 0")
</template>

<script>
import List from './list/index.vue'

export default {
	components: {
		'list': List,
	},

	data () {
		return {
			type: 'image',
			list: [],
		}
	},

	methods: {
		fetchData () {
			this.$get('/api/material/get')
				.then(data => this.list = data)
		},
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
