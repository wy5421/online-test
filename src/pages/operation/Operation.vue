<template>
<div>
        <TestInfo :key="test.id" v-for="test in tests" :test="test"></TestInfo>
    <div class="setting">
        <switch @change="getSetting"></switch>
        <div v-if="settings">
        <button class="btn" @click="updateTest" >修改</button>
        <button class="btn-del" @click="deleteTest" v-if="!deleteTe">删除</button>
        <button class="btn-del" @click="deleteConfirm" v-if="deleteTe">确认删除？</button>
        </div>
    </div>
    <div v-if="!settings">
    <div class="ipt" v-if="showAdd">
        <input type="text" placeholder="输入A-B-C-D即可" v-model="uAns">
        <button @click="addAns" class="btn">提交</button>
    </div>
    <div v-if="!showLoged" class="overed">
        <p>请授权登录</p>
    </div>
        <div v-if="!showAdd&&showLoged" class="overed">
            <p>已经做过啦</p>
            <p v-for="result in testResult" :key="result.id">你的答案是:{{result.uAns}}</p>
            <p v-for="test in tests" :key="test.id">作者说答案是:{{test.answer}}</p>
        </div>
    </div>

</div>
</template>

<script>

import {get, post} from '@/util'
import TestInfo from '@/components/TestInfo'

export default {
  components: {
    TestInfo
  },
  data () {
    return {
      testId: '',
      tests: {},
      testResult: [],
      userinfo: '',
      settings: false,
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
    }
  },
  methods: {
    async getUserTestDetail () {
      const data = {
        id: this.testId,
        openId: this.userinfo.openId
      }
      const tests = await get('/weapp/getUserTestDetail', data)
      this.tests = tests.list
      console.log(tests)
    },
    async getTestResult () {
      const testResult = await get('/weapp/testResult', {id: this.testId})
      this.testResult = testResult
      console.log(testResult)
    },
    async addAns () {
      const data = {
        openId: this.userinfo.openId,
        queId: this.testId,
        uAns: this.uAns
      }
      console.log(data)
      try {
        await post('/weapp/addAns', data)
      } catch (e) {
        e.showModal('失败', e.msg)
      }
      this.uAns = ''
      this.getTestResult()
    },
    getSetting (e) {
      if (e.target.value) {
        this.settings = true
        console.log(this.settings)
      } else {
        this.settings = false
      }
    },
    deleteTest () {
      this.deleteTe = true
    },
    async deleteConfirm () {
      await get('/weapp/deleteTest', {id: this.testId})
      wx.navigateTo({
        url: '/pages/owntest/main'
      })
    },
    updateTest () {
      wx.navigateTo({
        url: '/pages/updatetest/main?id=' + this.testId
      })
    }
  },
  mounted () {
    let userinfo = wx.getStorageSync('userinfo')
    console.log(userinfo)
    if (userinfo) {
      this.userinfo = userinfo
    }
    this.testId = this.$root.$mp.query.id
    // mpvue查询的方式
    // query所有查询的参数
    this.getUserTestDetail()
    this.getTestResult()
  },
  onShow () {
    this.settings = false
  }
}
</script>

<style lang='scss' scoped>
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
    margin: 20rpx auto;
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

.setting{
    width: 90%;
    margin: 10rpx auto;
}
</style>
