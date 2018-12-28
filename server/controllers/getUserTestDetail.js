const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
    const {id, openId} = ctx.request.query
    const test = await mysql('questions')
                        .select('questions.*','cSessionInfo.user_info','department.deptName')
                        .join('cSessionInfo','questions.openId','cSessionInfo.open_id')
                        .join('department','questions.deptId','department.id')
                        .where('questions.id',id)
                        .where('questions.openId',openId)
    
    console.log(test)

    ctx.state.data = {
        list: test.map(v=>{
            const info = JSON.parse(v.user_info)
            return Object.assign({},v,{
                user_info:{
                    ncName: info.nickName,
                    image: info.avatarUrl
                }
            })
        })
    }
    
    await mysql('questions')
            .where('id',id)
            .increment('count',1)
}