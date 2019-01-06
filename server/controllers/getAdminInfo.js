const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    
    const {page} = ctx.request.query

    const size = 5

    const admins = await mysql('admin')
                    .select('admin.*','cSessionInfo.user_info')
                    .join('cSessionInfo','cSessionInfo.open_id','admin.openId')
                    .limit(size)
                    .offset(Number(page)*size)
                    .orderBy('admin.id','desc')

    console.log(admins)
                    
    ctx.state.data = {
        list: admins.map(v=>{
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    ncName: info.nickName,
                    image: info.avatarUrl
                }
            })
        })
    }
        
}