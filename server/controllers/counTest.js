const {mysql} = require('../qcloud')

module.exports = async (ctx) =>{
    const {openId} = ctx.request.query
    const counter = await mysql('test')
                            // .select('test.uAns','questions.answer')
                            .count('uAns as a')
                            .join('questions', function() {
                                this.on('questions.id', '=', 'test.queId').andOn('questions.answer', '=', 'test.uAns')
                            })
                            .where('test.openId',openId)
                            // .andWhere('test.uAns','=','questions.answer')
                            // .where('questions.openId',openId)
    ctx.state.data = counter
    return ctx.state.data
}