const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
    const {id} = ctx.request.query
    const tests = await mysql('test')
                            .select('test.*','cSessionInfo.user_info','department.deptName','questions.*')
                            .join('cSessionInfo','test.openId','cSessionInfo.open_id')
                            .join('questions','test.queId','questions.id')
                            .join('department','questions.deptId','department.id')
                            .where('test.openId',id)
                            .limit(3)
                            .orderBy('test.id','desc')
    console.log(tests)
    ctx.state.data = {
        list: tests.map(v=>{
            const info = JSON.parse(v.user_info)
            return Object.assign({},v,{
                user_info:{
                    ncName: info.nickName,
                    image: info.avatarUrl
                }
            })
        })
    }
} 