const {mysql} = require('../qcloud')

module.exports = async (ctx) =>{
    const {openId, queId} = ctx.request.body

    try {
        await mysql('favorite').insert({openId, queId})
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