<template>
<div>
    <TestInfo :key="test.id" v-for="test in tests" :test="test"></TestInfo>
    <div class="ipt" v-if="showAdd">
        <input type="text" placeholder="输入A-B-C-D即可" v-model="uAns">
        <button @click="addAns" class="btn">提交</button>
    </div>
    <div v-if="!showLoged" class="overed">
        <p>请授权登录</p>
    </div>
        <div v-if="!showAdd&&showLoged" class="overed">
            <p>已经做过啦</p>
            <p v-for="result in testResult" :key="result.id">你的答案是：{{result.uAns}}</p>
            <p v-for="test in tests" :key="test.id">作者说答案是:{{test.answer}}</p>
        </div>
        <button open-type='share' class="btn">转发</button>
</div>
</template>

<script>

import {get, post, showModal} from '@/util'
import TestInfo from '@/components/TestInfo'

export default {
    components:{
        TestInfo
    },
    data(){
        return {
            testId: '',
            tests: {},
            userinfo: '',
            testResult: []
        }
    },
    computed:{
        showLoged(){
            if(!this.userinfo.openId){
                return false
            }
            else{
                return true
            }
        },
        showAdd(){
            if(this.testResult.filter(v=>v.openId==this.userinfo.openId).length){
                return false
            }
            return true
        }
        // score(){
        //     const userAns = this.testResult.uAns
        //     const testAns = this.tests.answer
        //     if(userAns === testAns){
        //         console.log(123)
        //     }
            // if(this.testResult.uAns === this.tests.answer){
            //     console.log(123)
            // }
        // }
    },
    methods:{
        async getDetail(){
            const tests = await get('/weapp/testDetail',{id:this.testId})
            this.tests = tests.list
            console.log(tests)
            wx.setNavigationBarTitle({
                title: `${tests.user_info.ncName}的提问`
            })
        },
        async getTestResult(){
            const testResult = await get('/weapp/testResult',{id:this.testId})
            this.testResult = testResult
            console.log(testResult)
        },
        async addAns(){
            const data = {
                openId: this.userinfo.openId,
                queId: this.testId,
                uAns: this.uAns
            }
            console.log(data)
            try {
                await post('/weapp/addAns', data)
            } catch (e) {
                e.showModal('失败',e.msg)
            }
            this.uAns = ''
            this.getTestResult()
        }
    },
    mounted(){

        let userinfo = wx.getStorageSync('userinfo')
        console.log(userinfo)
        if (userinfo) {
            this.userinfo = userinfo
        }

        this.testId = this.$root.$mp.query.id
        // mpvue查询的方式
        // query所有查询的参数
        this.getDetail()
        this.getTestResult()
    }
    
}
</script>

<style lang='scss'>
.ipt{
    width: 98%;
    margin: 10rpx auto;
    input{
        width: 95%;
        height: 60rpx;
        border: 2rpx solid rgb(245, 245, 203);
        margin: 20rpx auto;
        border-radius: 8%;
        background-color: rgb(243, 222, 222);
    }
}

.share{
    width: 98%;
    margin: 10rpx auto;
}

.btn{
    width: 90%;
    font-size: 32rpx;
    height: 80rpx;
    margin: 5rpx auto;
    color: white;
    background-color: rgb(0, 102, 0);
}
.btn:active{
    background-color: rgb(1, 82, 1);
}
.overed{
    width: 90%;
    margin: 20rpx auto;
    text-align: center;
    color: rgb(238, 128, 128);
    p{
        font-size: 32rpx;
        width: 100%;
        margin: 0 auto;
    }
}
</style>
