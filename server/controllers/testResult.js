const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
    const {id} = ctx.request.query
    const result = await mysql('test')
                            .select('test.openId','test.uAns')
                            .where('queId',id)
    ctx.state.data = result
    return ctx.state.data
}