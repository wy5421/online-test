<template>
    <div>
        <Alluserinfo :users='users'></Alluserinfo>
        <div  class="footer"><p>没有更多数据</p></div>
    </div>
</template>

<script>

import {get} from '@/util'
import Alluserinfo from '@/components/Alluserinfo'

export default {
    components: {
        Alluserinfo
    },
    data() {
      return {
          userinfo: '',
          users: [],
          more: true,
          page: '0',
      }  
    },
    methods: {
        async getAllUsers(init){
            if(init){
                this.page = 0
            }
            wx.showNavigationBarLoading()
            const users = await get('/weapp/getAllUsers', {page:this.page})
            if(users.list.length < 5 && this.page >= 0){
                this.more = false
            }
            if(init){
                this.users = users.list
                wx.stopPullDownRefresh()
            } else {
                this.users = this.users.concat(users.list)
            }
            wx.hideNavigationBarLoading()
            console.log(users)
        },
        onPullDownRefresh () {
            console.log("下拉")
            this.getAllUsers(true)
        },
        onReachBottom () {
            if(!this.more){
                return
                // 没有更多数据
            }
            this.page = this.page + 1
            this.getAllUsers()
        },      
    },

    mounted() {
        const userinfo = wx.getStorageSync('userinfo')
        if(userinfo){
            this.userinfo = userinfo
        }
        this.getAllUsers(true)
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
