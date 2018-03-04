import fs from 'fs'
import path from 'path'

function resolve (filePath) {
	return path.join(__dirname, filePath)
}

export async function getLogList (ctx) {
	const list = fs.readdirSync(resolve('../logs'))
	await ctx.render('logs/index', {list, title: '日志列表'})
}

export async function getLogDetail (ctx) {
	const fileName = ctx.params.name
	const filePath = resolve(`../logs/${fileName}`)

	if (fs.existsSync(filePath)) {
		ctx.body = fs.readFileSync(filePath, 'utf-8')
	} else {
		ctx.body = '该日志文件不存在或已被删除'
	}
}
