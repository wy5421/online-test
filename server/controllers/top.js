const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
    const tops = await mysql('questions')
                        .select('questions.*','cSessionInfo.user_info')
                        .join('cSessionInfo','questions.openId','cSessionInfo.open_id')
                        .orderBy('questions.count','desc')
                        .limit(5)
    
    ctx.state.data = {
        list: tops.map(v=>{
            const info = JSON.parse(v.user_info)
            return Object.assign({},v,{
                user_info:{
                    image: info.avatarUrl,
                    ncName: info.nickName
                }
            })
        })
    }
}