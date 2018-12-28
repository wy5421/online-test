<template>
<div class="body">
    <TopSwiper :tops='tops'></TopSwiper>
    <Card :key='test.id' v-for="test in tests" :test='test'></Card>
    <p v-if="!more" class="footer">没有更多数据</p>
</div>
</template>

<script>

import {get, showModal} from '@/util'
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'

export default {
    components: {
        Card,
        TopSwiper
    },
    data(){
        return {
            userinfo: '',
            tests: [],
            testId: '',
            page:0,
            more:true,
            tops: {}
        }
    },
    methods:{
        async getTests(init){
            if(init){
                this.page = 0
                this.more = true
            }
            wx.showNavigationBarLoading()
            const tests = await get('/weapp/getTests',{page:this.page})
            // this.tests = tests
            // this.tests = tests.list
            if(tests.list.length<5 && this.page>0){
                this.more = false
            }
            if(init){
                this.tests = tests.list
                wx.stopPullDownRefresh()
            }else{
                // 不是覆盖掉原有数据而是累加
                this.tests = this.tests.concat(tests.list)
            }
            wx.hideNavigationBarLoading()
            console.log(tests)
            // console.log(JSON.stringify(tests))
        },
        
        async getTop(){
            const tops = await get('/weapp/top')
            this.tops = tops.list
        }
    },
    onPullDownRefresh(){
        console.log('下拉')
        this.getTests(true)
        this.getTop()
    },
    onReachBottom(){
        if(!this.more){
            // 没有更多数据
            return 
        }
        this.page = this.page+1
        this.getTests()
    },
    mounted(){
        const userinfo = wx.getStorageSync('userinfo')
        if(userinfo){
            this.userinfo = userinfo
            
        }
        this.getTests(true)
        this.getTop()
    },
    computed:{
        detailUrl(){
            return '/pages/detail/main?id='
        }
    }
}
</script>

<style lang="scss" scoped>
.body{
    width: 100%;
    background-color: white;
}

Card{
    width: 100%;
    height: 500rpx;
}

TopSwiper{
    width: 100%;
    height: 100rpx;
    border: 2rpx solid black;
}

.testList{
    width: 96%;
    height: 200rpx;
    background-color: rgb(153, 212, 230);
    color: white;
    padding-top: 10rpx;
    margin: 20rpx auto;
    border-radius: 3%;
    position: relative;
}

.title{
    width: 80%;
    overflow: hidden;
    font-size: 42rpx;
    margin-top:20rpx;
    margin-left: 30rpx;
}

.testInfo{
    width: 100%;
    font-size: 28rpx;
    margin-top: 15rpx;
    margin-left: 40rpx;
    .uImage{
        width: 42rpx;
        height: 42rpx;
        border-radius: 50%;
        margin-right: 30rpx;
    }
}

.tag{
    position: absolute;
    width: 10%;
    right: 30rpx;
    top: 20rpx;
    border: 2rpx solid rgb(248, 157, 45);
    text-align: center;
    font-size: 32rpx;
    color: rgb(248, 157, 45);
    border-radius: 15%;
    // float: right;
}

.footer{
    width: 98%;
    text-align: center;
    font-size: 24rpx;
    color: rgb(209, 209, 209);
    margin-top: 20rpx;
    margin-bottom: 20rpx;
}

</style>
