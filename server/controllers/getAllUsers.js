const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    
    const {page} = ctx.request.query

    const size = 5

    const users = await mysql('cSessionInfo')
                    .select('cSessionInfo.*')
                    .limit(size)
                    .offset(Number(page)*size)

    console.log(users)
                    
    ctx.state.data = {
        list: users.map(v=>{
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