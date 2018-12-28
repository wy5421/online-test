/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

// 增加试题
router.post('/addTest', controllers.addTest)

// 获取Department信息
router.get('/getDepts', controllers.getDepts)

// 获取考试列表
router.get('/getTests', controllers.getTests)

// 获取考试详细信息
router.get('/testDetail', controllers.testDetail)

// 添加用户答案
router.post('/addAns', controllers.addAns)

// 查询是否回答过相关问题
router.get('/testResult', controllers.testResult)

// 获取排行榜信息
router.get('/top', controllers.top)

// 获取用户个人参加过的考试
router.get('/getUserFormerTest', controllers.getUserFormerTest)

// 获取用户发布的考试
router.get('/getUserTest', controllers.getUserTest)

// 获取用户所有参加过的考试
router.get('/getUserAllFtest', controllers.getUserAllFtest)

// 获取用户发布的所有考试
router.get('/getUserAllOtest', controllers.getUserAllOtest)

// 获取某一条用户发布的考试
router.get('/getUserTestDetail', controllers.getUserTestDetail)

// 删除某一条记录
router.get('/deleteTest', controllers.deleteTest)

// 更新某一条记录
router.get('/updateTest', controllers.updateTest)

module.exports = router
