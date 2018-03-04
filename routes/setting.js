import KoaRouter from 'koa-router'
import config from '../db/config'
import * as Setting from '../controller/setting'

const router = KoaRouter()

router.prefix(`${config.appPath}/app`)
// 获取所有app
router.get('/get', Setting.getAppList)
// 设置当前的app
router.post('/set', Setting.setApp)
// 添加app
router.post('/add', Setting.addApp)
// 删除app
router.get('/delete', Setting.deleteApp)
// 清零
router.get('/reset', Setting.resetApp)

// router.get('/logs/:name', PagesCtrl.getLogDetail)

export default router
