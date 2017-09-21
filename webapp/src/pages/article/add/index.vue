<template lang="pug">
div.article-add
	h2 上传图文详情（文中图片请先上传）
	Form(
		ref="form"
		:label-width="130"
		:rules="ruleValidate"
	)
		FormItem(label="标题（必填）" prop="title")
			Input(
				type="text"
				placeholder="请输入标题"
			)
		FormItem(label="封面ID（必填）" prop="cover")
			Input(
				type="text"
				placeholder="请输入封面ID"
			)
		FormItem(label="作者")
			Input(
				type="text"
				placeholder="请输入作者名"
			)
		FormItem(label="文章摘要")
			Input(
				type="text"
				placeholder="请输入摘要"
			)
		FormItem(label="是否显示封面")
			RadioGroup
				Radio(label="male") 显示
				Radio(label="female") 不显示
		FormItem(label="消息内容（必填 ）" prop="content")
			Input(
				type="textarea"
				placeholder="请输入消息内容"
				:autosize="{minRows: 4}"
			)
		FormItem(label="原文地址（必填）" prop="address")
			Input(
				type="text"
				placeholder="请输入原文地址URL"
			)
		FormItem
			Button(type="primary" @click="onSubmit") 提交
			Button(
				type="ghost"
				@click="$router.go(-1)"
				class="u-ml10"
			) 取消
</template>

<script>
export default {
	data () {
		return {
			ruleValidate: {
				title: [
					{
						required: true,
						message: '标题不能为空',
						trigger: 'blur',
					},
				],
				cover: [
					{
						required: true,
						message: '标题不能为空',
						trigger: 'blur',
					},
				],
				content: [
					{
						required: true,
						message: '内容不能为空',
						trigger: 'blur',
					},
				],
				address: [
					{
						required: true,
						message: '原文地址不能为空',
						trigger: 'blur',
					},
				],
			}
		}
	},

	methods: {
		onSubmit () {
			this.$refs.form.validate(valid => {
				console.log(valid)
			})
		},
	},
}
</script>

<style lang="stylus" scoped>
.article-add
	padding 1rem 0
	max-width 600px
	margin 0 auto
	h2
		text-align: center
		margin-bottom: 1rem
	form
		margin-left: -120px
</style>
