const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
    
    const {page} = ctx.request.query
   
    const size = 5
    
    const tests = await mysql('questions')
                    .select('questions.*','cSessionInfo.user_info','department.deptName')
                    .join('cSessionInfo','questions.openId','cSessionInfo.open_id')
                    .join('department','questions.deptId','department.id')
                    .limit(size)
                    .offset(Number(page)*size)
                    .orderBy('questions.id','desc')

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
    
    // return ctx.state.data

}