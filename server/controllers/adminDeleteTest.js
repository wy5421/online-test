const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
   
    const {id} = ctx.request.query
    
    try {
        await mysql('questions').delete('questions.id').where('questions.id', id)
        await mysql('test').delete('test.queId').where('test.queId', id)
        await mysql('favorite').delete('favorite.queId').where('favorite.queId', id)
        ctx.state.data = {
            msg: 'success'
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg:'失败' + e.sqlMessage
            }
        }
    }
}
