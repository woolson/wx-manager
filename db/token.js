import mongoose, { Schema } from 'mongoose'
import { syncMongoFunc } from '../common/utils'

const TokenSchema = new Schema({
	name: String,
	appId: String,
	accessToken: {
		value: String,
		timestamp: Number,
	},
	cardTicket: {
		value: String,
		timestamp: Number,
	},
	jsApiTicket: {
		value: String,
		timestamp: Number,
	},
})

// 把异步函数转同步
const args = [
	TokenSchema,
	'Apps',
	['save', 'remove', 'update', 'find', 'findOne'],
]
syncMongoFunc(...args)
// 注册model
const TokenModel = mongoose.model('Apps', TokenSchema)

export default TokenModel
