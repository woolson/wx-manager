<template lang="pug">
div.setting.common-block
	h2.u-mb15 设置APP
	Tabs(v-model="tabIndex")
		TabPane(label="列表" icon="ios-list-outline")
			RadioGroup(v-model="app")
				ul.setting__apps
					li(v-for="item in apps")
						Radio(:label="item.id") &nbsp;
						div.content
							h3 {{item.name}}
							div
								label AppId：
								span.u-color-main {{item.appId}}
								span(
									v-clipboard="item.appId"
									class="u-ml10 u-color-blue u-pointer"
									@success="copySuccessFn"
								) 点击复制
					li.setting__apps__buttons
						Button(
							type="success"
							shape="circle"
							size="small"
							@click="useApp"
							:disabled="this.app == this.currentApp"
						) 使用
						Button(
							type="info"
							shape="circle"
							size="small"
							:disabled="this.app == this.currentApp"
							@click="deleteApp"
						) 编辑
						Button(
							type="error"
							shape="circle"
							size="small"
							:disabled="this.app == this.currentApp"
							@click="deleteApp"
						) 删除

		TabPane(label="添加" icon="plus")
			div.setting__add
				Form(:model="appInfo" :label-width="80")
					FormItem(label="名称")
						Input(v-model="appInfo.name" placeholder="请输入")
					FormItem(label="AppId")
						Input(v-model="appInfo.appId" placeholder="请输入ID")
					FormItem(label="Secret")
						Input(v-model="appInfo.secret" placeholder="请输入秘钥")
					FormItem.setting__add__buttons
						Button(
							type="success"
							shape="circle"
							class="u-mr10"
							size="small"
							@click="addApp"
						) 确定
						Button(
							shape="circle"
							size="small"
							@click="tabIndex = 0"
						) 取消
</template>

<script>
export default {
	data () {
		return {
			app: null,
			currentApp: null,
			apps: [],
			appInfo: {},
			tabIndex: 0,
			copySuccessFn: require('src/common/utils').copySuccessFn,
		}
	},

	mounted () {
		this.fetchApps()
	},

	methods: {
		fetchApps () {
			this.$get('/api/app/get')
				.then(data => {
					this.app = data.filter(o => o.inUse)[0].id + ""
					this.currentApp = this.app
					this.apps = data
				})
		},
		useApp () {
			this.$post('/api/app/set', {id: this.app})
				.then(data => {
					this.$Message.success('设置成功')
					this.currentApp = this.app
				})
		},
		addApp () {
			const { name, appId, secret } = this.appInfo
			if(!name || !appId || !secret) {
				this.$Message.error('请填写完整')
				return
			}

			this.$post('/api/app/add', this.appInfo)
				.then(data => {
					this.fetchApps()
					this.$Message.success('添加成功')
					this.tabIndex = 0
				})
		},
		deleteApp () {
			this.$post('/api/app/delete', {index: this.app})
				.then(data => {
					this.$Message.success('删除成功')
					this.fetchApps()
				})
		},
	},
}
</script>

<style lang="stylus" scoped>
.ivu-radio-group
	width: 100%

.setting__apps
	border: $border-default
	border-radius .5rem
	width: 100%
	li
		display flex
		align-items: center
		padding .8rem
		border-bottom: $border-default
		&:last-child
			border-bottom: none

.setting__apps__buttons
.setting__add__buttons div
	display: flex
	justify-content: space-around
	button
		flex-basis 25%
</style>
