const {mysql} = require('../qcloud')

module.exports = async (ctx) =>{
    const {openId} = ctx.request.body
    try {
        await mysql('userinfo').insert({openId})
        ctx.state.data = {
            msg: 'success'
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: '添加失败' + e.sqlMessage
            }
        }
    }
}