const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
    const {title, choiceA, choiceB, choiceC, choiceD, answer, openId, deptId} = ctx.request.body

    console.log(title, choiceA, choiceB, choiceC, choiceD, answer, openId)

    try {
        await mysql('questions').insert({title, choiceA, choiceB, choiceC, choiceD, answer, openId, deptId})
        ctx.state.data = {
            msg: 'success'
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data:{
                msg:'添加失败'+e.sqlMessage
            }
        }
    }
}