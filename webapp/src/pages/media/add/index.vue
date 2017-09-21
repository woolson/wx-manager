<template lang="pug">
div.media-add
	h2 上传媒体
	Form(
		ref="form"
		@submit.prevent="onSubmit"
		:label-width="60"
	)
		FormItem(label="上传文件")
			Upload(
				multiple
				action=""
				:before-upload="handleUpload"
			)
				Button(type="ghost" icon="ios-cloud-upload-outline") 选择要上传文件的文件
		FormItem(label="媒体类型")
			RadioGroup(v-model="type")
				Radio(label="image") 图片
				Radio(label="vedio") 视频
				Radio(label="voice") 声音
		FormItem(label="是否永久")
			RadioGroup(v-model="forever")
				Radio(label="true") 是
				Radio(label="false") 否
		FormItem
			Button(type="primary" @click="onSubmit") 提交
			Button(
				type="ghost"
				@click="$router.go(-1)"
				class="u-ml10"
			) 取消
	ul.media-add__result(v-show="result.length !== 0")
		li.title 上传列表
		li(v-for="item in result")
			div.image
				img(:src="item.data.url")
			div.content
				h3 {{item.name}}
				a(target="_blank" v-show="item.data.media_id")
					span {{item.data.media_id}}
					span(
						v-clipboard="item.data.media_id"
						@success="copySuccess"
					) 点击复制
				a(target="_blank")
					span {{item.data.url}}
					span(
						v-clipboard="item.data.url"
						@success="copySuccess"
					) 点击复制
</template>

<script>
export default {
	data () {
		return {
			type: 'image',
			forever: 'true',
			files: null,
			data: [],
			result: [],
		}
	},

	methods: {
		onSubmit () {
			if (!this.files) {
				this.$Message.error('请选择文件')
				return
			}

			const formData = new FormData()
			formData.append('type', this.type)
			formData.append('forever', this.forever)
			formData.append('media', this.files)

			this.$post('/api/image/add', formData)
				.then(data => {
					this.result = this.result.concat(data)
					this.files = null
				})
		},
		handleUpload (files) {
			this.files = files
			return false
		},
		copySuccess () {
			this.$Message.success('复制成功')
		},
	},
}
</script>

<style lang="stylus">
.media-add
	padding 1rem 0
	max-width 600px
	margin 0 auto
	h2
		text-align: center
		margin-bottom: 1rem
	.ivu-radio-wrapper
		width: 3rem

.media-add__upload
	padding: 1rem

.media-add__result
	margin-top 1rem
	border $border-default
	border-radius .25rem
	li
		padding .5rem
		display flex
		border-top: $border-default
		.image
			width: 5rem
			margin-right: .5rem
			img
				width: 100%
		.content
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
		&.title
			border none
			font-size .8rem
			font-weight bold
</style>
