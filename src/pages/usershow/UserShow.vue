<template>
    <div>
        <div v-if="!addUs">
            <p class="tips">点击加入后展开</p>
            <button class="btn" @click="addDeInfo">加入</button>
        </div>
        <div v-if="addUs" class="uInfo">
        <UserSocial :key="index" v-for="(userDeInfo,index) in userDeInfo" :userDeInfo='userDeInfo'></UserSocial>
        <div class="setting">
            <a :href="settingUrl"><img src="/static/img/setting.png" class="setIcon"></a>
        </div>
        <div class="testCount">
            <div class="title"><p>答题情况分析</p></div>
            <p class="content" :key="countTest" v-for="countTest in countTests">累计答对<span class="mainContent">{{countTest.a}}</span>道题</p>
            <p class="content" :key="countFarmer" v-for="countFarmer in countFarmers">累计回答<span class="mainContent">{{countFarmer.b}}</span>道题</p>
        </div>
        
        <div>
            <div class="title"><p>个人收藏</p></div>
            <p class="content" :key="countFavorite" v-for="countFavorite in countFavorites" @click="naviAllFav">累计收藏<span class="mainContent">{{countFavorite.c}}</span>道题</p>
            <FavoriteCard :key="favoriteTest.id" v-for="favoriteTest in favoriteTests" :favoriteTest='favoriteTest'></FavoriteCard>
        </div>
        </div>
    </div>
</template>

<script>

import {get, post, showModal} from '@/util'
import UserSocial from '@/components/UserSocial'
import FavoriteCard from '@/components/FavoriteCard'

export default {
    components:{
        UserSocial,
        FavoriteCard
    },
    data(){
        return {
            userinfo: '',
            userDeInfo: '',
            countTests: '',
            countFarmers: '',
            countFavorites: '',
            favoriteTests: []
        }
    },
    methods:{
        async getUserDeInfo(){
            const userDeInfo = await post('/weapp/getUserDeInfo',{openId:this.userinfo.openId})
            this.userDeInfo = userDeInfo.list
            console.log(userDeInfo)
        },
        async addDeInfo(){
            try{
                await post('/weapp/addUserDeInfo', {openId:this.userinfo.openId})
                this.getUserDeInfo()
            }catch(e){
                showModal('失败', e.msg)
            }
        },
        async countTest(){
            const countTests = await get('/weapp/counTest',{openId:this.userinfo.openId})
            this.countTests = countTests
        },
        async countFarTest(){
            const countFarmers = await get('/weapp/countFarTest',{ openId:this.userinfo.openId })
            this.countFarmers = countFarmers
            console.log(countFarmers)
        },
        async countFavorite(){
            const countFavorites = await get('/weapp/countFavorite',{ openId:this.userinfo.openId })
            this.countFavorites = countFavorites
            console.log(countFavorites)
        },
        async getFavorite(){
            const favoriteTests = await get('/weapp/getFavoriteTest',{ openId:this.userinfo.openId })
            this.favoriteTests = favoriteTests.list
            console.log(favoriteTests)
        },
        naviAllFav(){
            wx.navigateTo({
                url: '/pages/userfavoritelist/main'
            })
        },
        onPullDownRefresh () {
            console.log('下拉')
            this.getUserDeInfo()
            wx.stopPullDownRefresh()
        }
    },
    computed:{
        settingUrl(){
            return '/pages/usershowset/main'
        },
        addUs(){
            if(this.userDeInfo.length){
                return true
            }
            return false
        }
    },
    mounted(){
        const userinfo = wx.getStorageSync('userinfo')
        if(userinfo){
            this.userinfo = userinfo
        }
        this.getUserDeInfo()
        this.countTest()
        this.countFarTest()
        this.countFavorite()
        this.getFavorite()
    }
}
</script>

<style lang="scss" scoped>
.uInfo{
    position: relative;
}

.setting{
    position: absolute;
    right: 20rpx;
    top: 20rpx;
    margin-right: 30rpx;
    margin-top: 20rpx;
    text-align: center;
}


.setIcon{
    width: 75rpx;
    height: 75rpx;
}

.title{
    width: 30%;
    margin-top: 30rpx;
    margin-left: 10rpx;
    padding-left: 20rpx;
    font-size: 32rpx;
    border-left: 4rpx solid red;
}

a:hover{
    background-color: white;
}

.content{
    width: 100%;
    margin-top: 20rpx;
    margin-left: 30rpx;
    position: relative;
}
.content .seaIcon{
    position: absolute;
    top: 5rpx;
    left: 20%;
}

.mainContent{
    margin: 0 5rpx;
    color: rgb(238, 128, 128);
}

</style>
