import mongoose, { Schema } from 'mongoose'
import { syncMongoFunc } from '../common/utils'

const UsersSchema = new Schema({
	subscribe: Number,
	openid: String,
	nickname: String,
	sex: Number,
	language: String,
	city: String,
	province: String,
	country: String,
	headimgurl: String,
	subscribe_time: Number,
	remark: String,
	groupid: Number,
	tagid_list: [String],
	updateTime: String,
})

// 把异步函数转同步
const args = [
	UsersSchema,
	'Users',
	['save', 'remove', 'update', 'find', 'findOne'],
]
syncMongoFunc(...args)
// 注册model
const UserModel = mongoose.model('Users', UsersSchema)

export default UserModel
