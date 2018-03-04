const IS_PRO = process.env.NODE_ENV !== 'development'
const host = IS_PRO ? 'localhost:20610' : '118.126.89.247:20610'

export default {
	address: `mongodb://${host}/manager`,
	appPath: '/wx-manager/api',
}
