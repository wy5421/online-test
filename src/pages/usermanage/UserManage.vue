<template>
    <div>
        <UserInfo :admins='admins'></UserInfo>
        <div  class="footer"><p>没有更多数据</p></div>
    </div>
</template>

<script>

import {get} from '@/util'
import UserInfo from '@/components/UserInfo'

export default {
    components: {
        UserInfo
    },
    data() {
      return {
          userinfo: '',
          users: [],
          admins: [],
        //   userList: [],
          more: true,
          addAd: false,
          page: '0',
      }  
    },
    methods: {
        async getAdminInfo(init){
            if(init){
                this.page = 0
            }
            wx.showNavigationBarLoading()
            const admins = await get('/weapp/getAdminInfo', {page:this.page})
            if(admins.list.length < 5 && this.page >= 0){
                this.more = false
            }
            if(init){
                this.admins = admins.list
                wx.stopPullDownRefresh()
            } else {
                this.admins = this.admins.concat(admins.list)
            }
            wx.hideNavigationBarLoading()
            console.log(admins)
        },
        onPullDownRefresh () {
            console.log("下拉")
            this.getAdminInfo(true)
        },
        onReachBottom () {
            if(!this.more){
                return
                // 没有更多数据
            }
            this.page = this.page + 1
            this.getAdminInfo()
        },
        addAdmin(){
            this.addAd = true
        }        
    },
    // computed:{
        // 代码正确性待定
        // userList(){
        //     for(let i = 0;i<this.users.length;i++)
        //     {
        //         for(let j = 0;j<this.admins.length;j++)
        //         {
        //             if(this.users[i]!=this.admins[j]){
        //                 console.log('********************')
        //                 this.userList.push(users[i])
        //                 console.log('-------------------')
        //             }
        //         }
        //     }
        //     console.log(userList) 
        //     return userList
        // }
    // },
    mounted() {
        const userinfo = wx.getStorageSync('userinfo')
        if(userinfo){
            this.userinfo = userinfo
        }
        this.getAdminInfo(true)
        // this.getAllUsers()
    }
}
</script>

<style lang="scss" scoped>
.footer{
    width: 98%;
    text-align: center;
    font-size: 24rpx;
    color: rgb(209, 209, 209);
    margin-top: 20rpx;
    margin-bottom: 20rpx;
}
</style>
