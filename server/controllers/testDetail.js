const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {id} = ctx.request.query

    const detail = await mysql('questions')
        .select('questions.*', 'cSessionInfo.user_info', 'department.deptName')
        .join('cSessionInfo', 'questions.openId', 'cSessionInfo.open_id')
        .join('department', 'questions.deptId', 'department.id')
        .where('questions.id', id)
    console.log(detail)
    ctx.state.data = {
        list: detail.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    ncName: info.nickName,
                    image: info.avatarUrl
                }
            })
        })
    }

    await mysql('questions')
        .where('id', id)
        .increment('count', 1)

    // await mysql('questions')
    //         .where('id',id)
}
