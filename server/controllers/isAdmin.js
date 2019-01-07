const {mysql} = require('../qcloud')

module.exports = async (ctx) =>{
    const {openId} = ctx.request.body

    const adminList = await mysql('admin')
                                .select('admin.*')
                                .where('admin.openId',openId)
    console.log(adminList)
    ctx.state.data = adminList
    return ctx.state.data
}