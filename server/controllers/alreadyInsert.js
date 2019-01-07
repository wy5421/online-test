const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {openId, queId} = ctx.request.query

    const favorites = await mysql('favorite').select('*').where('queId',queId).andWhere('openId',openId)

    ctx.state.data = favorites
    
    return ctx.state.data
}