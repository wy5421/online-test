const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {openId} = ctx.request.query

    const countFavoriteTests = await mysql('favorite')
                                        .count('favorite.id as c')
                                        .where('favorite.openId', openId)

    ctx.state.data = countFavoriteTests
    
    return ctx.state.data
    
}