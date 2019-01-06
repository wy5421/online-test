const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {openId} = ctx.request.body
    const userInfoes = await mysql('userinfo')
                                .select('userinfo.*','cSessionInfo.user_info')
                                .join('cSessionInfo','cSessionInfo.open_id','userinfo.openId')
                                .where('userinfo.openId',openId)

    console.log(userInfoes)
    ctx.state.data = {
        list: userInfoes.map(v=>{
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info:{
                    ncName: info.nickName,
                    image: info.avatarUrl
                }
            })
        })
    }
}