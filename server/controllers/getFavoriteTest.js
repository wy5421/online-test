const {mysql} = require("../qcloud")

module.exports = async (ctx) => {
    const {openId} = ctx.request.query

    const favorites = await mysql('favorite')
                        .select('favorite.*','questions.*','cSessionInfo.user_info','department.deptName')
                        .join('questions','questions.id','favorite.queId')
                        .join('cSessionInfo','cSessionInfo.open_id','favorite.openId')
                        .join('department','department.id','questions.deptId')
                        .limit(1)
                        .where('favorite.openId', openId)

    console.log(favorites)
    ctx.state.data = {
        list: favorites.map(v=>{
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