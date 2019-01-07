<template>
<div>
    <div class="testInfo">
    <TestInfo :key="test.id" v-for="test in tests" :test="test"></TestInfo>
    </div>
    <div class="addFavorite" >
      <icon type='download' color='white' size='40rpx' @click="insertFavorite" v-if="!Inserted"></icon>
      <icon type='success' color='white' size='40rpx' v-if="Inserted"></icon>
    </div>
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
            <button v-if="!Resub&&!agreeUp" class="btn" @click="applyUp">重做</button>
            <div v-if="agreeUp">
              <input type="text" placeholder="输入A-B-C-D即可" v-model="secUAns">
              <button @click="updateAns" class="btn">提交</button>
            </div>
        </div>
        <div v-if="Admin">
          <button class="btn-del" @click="deleteTest" v-if="!deleteTe">删除</button>
          <button class="btn-del" @click="deleteConfirm" v-if="deleteTe">确认删除？</button>
        </div>
</div>
</template>

<script>

import {get, post, showModal} from '@/util'
import TestInfo from '@/components/TestInfo'

export default {
  components: {
    TestInfo
  },
  data () {
    return {
      testId: '',
      tests: '',
      userinfo: '',
      testResult: [],
      ansJudgement: '',
      dataFavorites: '',
      adminList: [],
      agreeUp: false,
      deleteTe: false
    }
  },
  computed: {
    showLoged () {
      if (!this.userinfo.openId) {
        return false
      } else {
        return true
      }
    },
    showAdd () {
      if (this.testResult.filter(v => v.openId === this.userinfo.openId).length) {
        return false
      }
      return true
    },
    Resub(){
      if(this.ansJudgement.length){
        //若回答正确，返回为真，不允许重做，否则可以重做
        return true
      }
      return false
    },
    Inserted(){
      if(this.dataFavorites.length){
        // 已经收藏
        return true
      }
      return false
    },
    Admin(){
      if(this.adminList.length){
        // 判断是不是管理员
        return true
      }
      return false
    }
  },
  methods: {
    async getDetail () {
      const tests = await get('/weapp/testDetail', {id: this.testId})
      this.tests = tests.list
    },
    async getTestResult () {
      const testResult = await get('/weapp/testResult', {id: this.testId})
      this.testResult = testResult
    },
    async addAns () {
      const data = {
        openId: this.userinfo.openId,
        queId: this.testId,
        uAns: this.uAns
      }
      try {
        await post('/weapp/addAns', data)
      } catch (e) {
        e.showModal('失败', e.msg)
      }
      this.uAns = ''
      this.getTestResult()
    },
    async ansJudge(){
      //判断答案是否正确
      const data = {
        id: this.testId,
        openId: this.userinfo.openId
      }
      const ansJudgement = await get('/weapp/ansIsTrue',data)
      this.ansJudgement = ansJudgement
    },
    async updateAns(){
      const data = {
        openId: this.userinfo.openId,
        queId: this.testId,
        uAns: this.secUAns
      }
      try {
        await post('/weapp/updateAns', data)
      }catch(e){
        e.showModal('失败', e.msg)
      }
      this.getTestResult()
      this.agreeUp = false
      this.ansJudge()
    },
    async insertFavorite(){
      const dataFavorite = {
        openId: this.userinfo.openId,
        queId: this.testId
      }
      try {
        await post('/weapp/addFavorite', dataFavorite)
      } catch (e) {
        e.showModal('失败', e.msg)
      }
      this.alreadyInsert()
    },
    async alreadyInsert(){
      const dataFavorite = {
        openId: this.userinfo.openId,
        queId: this.testId
      }
      const dataFavorites = await get('/weapp/alreadyInsert', dataFavorite)
      this.dataFavorites = dataFavorites
    },
    async isAdmin(){
      const adminList = await get('/weapp/isAdmin', {openId: this.userinfo.openId})
      this.adminList = adminList
      console.log(123,adminList)
    },
    async deleteConfirm(){
      await get('/weapp/adminDeleteTest', {id: this.testId})
      wx.switchTab({
        url: '/pages/tests/main'
      })
    },
    applyUp(){
      this.agreeUp = true
    },
    deleteTest(){
      this.deleteTe = true
    }
  },
  mounted () {
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }

    this.testId = this.$root.$mp.query.id
    // mpvue查询的方式
    // query所有查询的参数
    this.getDetail()
    this.getTestResult()
    this.ansJudge()
    this.isAdmin()
    this.agreeUp = false
    this.alreadyInsert()
  }

}
</script>

<style lang='scss' scoped>

.testInfo{
  position: relative;
}
.addFavorite{
  position: absolute;
  top: 60rpx;
  right: 50rpx;
}

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

.btn-del{
     width: 90%;
    font-size: 32rpx;
    height: 80rpx;
    margin: 20rpx auto;
    color: white;
    background-color: rgb(250, 4, 4);
}
.btn-del:active{
    background-color: rgb(158, 4, 4);
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
