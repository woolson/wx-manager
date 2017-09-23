<template lang="pug">
div.article-add.common-block
	Form(
		ref="form"
		v-if="!mediaId"
		:model="formData"
		:label-width="130"
	)
		h2 上传图文详情（文中图片请先上传）
		FormItem(label="标题（必填）" prop="title")
			Input(
				type="text"
				v-model="formData.title"
				placeholder="请输入标题"
			)
		FormItem(label="封面ID（必填）" prop="cover")
			Input(
				type="text"
				v-model="formData.thumb_media_id"
				placeholder="请输入封面ID"
			)
		FormItem(label="作者")
			Input(
				type="text"
				v-model="formData.author"
				placeholder="请输入作者名"
			)
		FormItem(label="文章摘要")
			Input(
				type="text"
				v-model="formData.digest"
				placeholder="请输入摘要"
			)
		FormItem(label="是否显示封面")
			RadioGroup(v-model="formData.show_cover_pic")
				Radio(label="true") 显示
				Radio(label="false") 不显示
		FormItem(label="消息内容（必填 ）" prop="content")
			Input(
				type="textarea"
				placeholder="请输入消息内容"
				v-model="formData.content"
				:autosize="{minRows: 4}"
			)
		FormItem(label="原文地址（必填）" prop="address")
			Input(
				type="text"
				v-model="formData.content_source_url"
				placeholder="请输入原文地址URL"
			)
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
				@click="$router.go(-1)"
				class="u-ml10"
			) 取消
	div.article-add__result(v-else)
		h2.u-color-green 上传成功
		p.u-ta-center
			span.u-mr10.u-color-main {{mediaId}}
			span.u-td-underline.u-color-blue.u-pointer(
				v-clipboard="mediaId"
				@success="copySuccessFn"
			) 点击复制
</template>

<script>
export default {
	data () {
		return {
			formData: {
				show_cover_pic: 'false',
			},
			mediaId: '',
			copySuccessFn: require('src/common/utils').copySuccessFn,
		}
	},

	methods: {
		onSubmit () {
			const items = [
				'title',
				'thumb_media_id',
				'content',
				'content_source_url',
			]
			if (items.some(o => this.formData[o] === '')) {
				this.$Message.error('请填写完整')
				return
			}

			this.$post('/api/article/add', this.formData)
				.then(data => this.mediaId = data.media_id)
		},
	},
}
</script>

<style lang="stylus" scoped>
.article-add
	padding 1rem 0
	margin 0 auto
	h2
		text-align: center
		margin-bottom: 1rem
	button
		min-width 3rem
</style>
