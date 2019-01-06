const {mysql} = require('../qcloud')

module.exports = async (ctx) =>{
    const {openId} = ctx.request.query

    const countFarTests = await mysql('test')
                                    .count('uAns as b')
                                    .where('test.openId',openId)
    console.log(countFarTests)
    ctx.state.data = countFarTests
    return ctx.state.data
}