const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const { id, title, choiceA, choiceB, choiceC, choiceD, answer } = ctx.request.query
    console.log(id, title, choiceA, choiceB, choiceC, choiceD, answer)

    try {
        await mysql('questions').update({title, choiceA, choiceB, choiceC, choiceD, answer}).where('questions.id', id)
        ctx.state.data = {
            msg: 'success'
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: '更新失败' + e.sqlMessage
            }
        }
    }
}
