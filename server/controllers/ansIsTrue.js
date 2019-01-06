const {mysql} = require('../qcloud')

module.exports = async (ctx) =>{
    const {id, openId} = ctx.request.query
    const isTrue = await mysql('test')
                            .select('test.id')
                            .join('questions','questions.answer','test.uAns')
                            .where('test.queId',id)
                            .where('test.openId',openId)
                            .where('questions.id',id)
    console.log(isTrue)
    ctx.state.data = isTrue
    return ctx.state.data
    
}