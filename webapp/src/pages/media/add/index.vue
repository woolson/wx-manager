<template lang="pug">
div.media-add.common-block
	h2 上传媒体
	Form(
		ref="form"
		@submit.prevent="onSubmit"
		:label-width="60"
	)
		FormItem(label="上传文件")
			input(
				multiple
				type="file"
				ref="uploadFile"
				class="u-hidden"
				@change="chooseFile"
			)
			Button(
				type="ghost"
				icon="ios-cloud-upload-outline"
				@click="triggerChoose"
			) 选择要上传文件的文件
		FormItem(lable="" v-show="files && files.length !== 0")
			ul.media-add__list
				li.u-display-flex.u-ai-baseline(v-for="(file, index) in files")
					i.u-mr20.u-color-red.u-pointer.wm.wm-times(
						type="close"
						@click="removeFile(index)"
					)
					span.u-w50 {{formatSize(file.size)}}
					span.u-ml20.u-color-main {{file.name}}
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
			Button(
				type="success"
				shape="circle"
				size="small"
				@click="onSubmit"
			) 提交
			Button(
				type="ghost"
				shape="circle"
				size="small"
				class="u-ml10"
				@click="$router.go(-1)"
			) 取消
		list(:list="result" title="上传列表" v-show="result.length !== 0")
</template>

<script>
import List from '../list/index.vue'
import { formatSize } from 'src/common/utils'

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
			formatSize,
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
			this.files.forEach(o => {
				formData.append('media', o)
			})

			this.$post('/api/image/add', formData)
				.then(data => {
					this.result = this.result.concat(data)
					this.files = null
				})
		},
		removeFile (index) {
			const files = this.files
			files.splice(index, 1)
			this.files = files
		},
		chooseFile (evt) {
			const files = Array.from(evt.target.files)
			this.files = (this.files || []).concat(files)
		},
		triggerChoose () {
			this.$refs.uploadFile.click()
		},
	},
}
</script>

<style lang="stylus">
.media-add
	h2
		text-align: center
		margin-bottom: 1rem
	.ivu-radio-wrapper
		width: 3rem
	button
		min-width 3rem
	.media-add__list i
		font-size: .6rem

.media-add__upload
	padding: 1rem
</style>
