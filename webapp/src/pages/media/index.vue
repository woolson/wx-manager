<template lang="pug">
div.media
	h2 媒体列表
	div
		Button(
			type="info"
			shape="circle"
			size="small"
			@click="fetchData"
		) 查询媒体
		Button(
			type="success"
			class="u-ml10"
			shape="circle"
			size="small"
			@click="$router.push('/media/add')"
		) 添加媒体
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
			this.$get('/api/material/get', {type: this.type})
				.then(data => this.list = data.item)
		},
	},
}
</script>

<style lang="stylus">
.media
	padding 1rem 0
	h2
	> div
		margin-bottom 1rem
		margin-bottom 1rem
</style>
