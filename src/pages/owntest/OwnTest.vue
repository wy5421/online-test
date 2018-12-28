<template>
    <div>
        <UserOwnTest :key="usertest.id" v-for="usertest in usertest" :usertest="usertest"></UserOwnTest>
    </div>
</template>

<script>
import {get, showModal} from '@/util'
import UserOwnTest from '@/components/UserOwnTest'

export default {
    components:{
        UserOwnTest
    },
    data(){
        return {
            userinfo: '',
            usertest: {}
        }
    },
    methods:{
        async getUserAllOtest(){
            const usertest = await get('/weapp/getUserAllOtest', {id:this.userinfo.openId})
            this.usertest = usertest.list
        }
    },
    onPullDownRefresh(){
        wx.showNavigationBarLoading()
        console.log('下拉')
        this.getUserAllOtest()
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
    },    
    mounted(){
        const userinfo = wx.getStorageSync('userinfo')
        if(userinfo){
            this.userinfo = userinfo 
        }
        this.getUserAllOtest()
    }
}
</script>

<style>

</style>
