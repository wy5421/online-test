const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {openId, signName, phone,location} = ctx.request.body
    try {
        await mysql('userinfo').update({signName, phone,location}).where('userinfo.openId',openId)
        ctx.state.data = {
            msg: 'success'
        }
    } catch (e) {
        ctx.state = {
            code: '-1',
            data: {
                msg: '更新失败' + e.sqlMessage
            }
        }
    }
}