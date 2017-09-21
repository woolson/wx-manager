<template lang="pug">
div.article
	Form(:label-width="80")
		FormItem(label="滑块")
		FormItem(label="文本域")
			Input(
				type="text"
				placeholder="请输入..."
			)
		FormItem
			Button(type="primary") 提交
			Button(type="ghost" class="u-ml10") 取消
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
.article
	max-width: 900px
	margin: 0 auto
</style>
