const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
    const {id} = ctx.request.query
    await mysql('questions').delete('questions.id').where('questions.id', id)
    await mysql('test').delete('test.queId').where('test.queId', id)
}