const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
    const de = ctx.request.query
    const depts = await mysql('department').select('department.*')
    console.log(depts)
    ctx.state.data = depts
    return ctx.state.data
    // {
    //     list: depts.map(v=>{
    //         console.log(v.id,v.name)
    //         const info = JSON.parse(v)
    //         console.log(info)
    //         return Object.assign({},v, {
    //             id: info.id,
    //             name: inform.name
    //         })
            
    //     })
    // }
    // return ctx.state
}