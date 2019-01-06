const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {queId, openId, uAns} = ctx.request.body
    console.log({queId, openId, uAns})
    try{
        await mysql('test').update({uAns}).where('test.queId',queId).where('test.openId',openId)
        ctx.state.data = {
            msg: 'success'
        }
    } catch(e){
        ctx.state = {
            code: '-1',
            data: {
                msg: '更新失败' + e.sqlMessage
            }
        }
    }
}