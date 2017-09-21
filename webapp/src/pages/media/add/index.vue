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
		list(:list="result" title="上传列表" v-show="result.length !== 0")
</template>

<script>
import List from '../list/index.vue'

export default {
	components: {
		'list': List,
	},

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
</style>
