const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
    const {openId, queId, uAns} = ctx.request.body
    console.log(openId, queId, uAns)
    try {
    await mysql('test').insert({openId, queId, uAns})
        ctx.state.data = {
            msg: 'success'
        }
    } catch (e) {
        ctx.state = {
            code: '-1',
            data:{
                msg:'失败'+e.sqlMessage
            } 
        }
    }
}