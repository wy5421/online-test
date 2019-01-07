const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {openId, nickName} = ctx.request.body

    try {
        await mysql('admin').insert({openId, nickName})
        ctx.state.data = {
            msg: 'success'
        }
    } catch (error) {
        ctx.state = {
            code: '-1',
            data: {
                msg: '失败' + e.sqlMessage
            }
        }
    }
}