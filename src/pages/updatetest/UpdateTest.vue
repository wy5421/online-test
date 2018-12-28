<template>
<div>
    <div class="testInfo" :key="test" v-for="test in tests" :test="test">
        <div class="thumb">
        <img class="back" 
            :src="test.user_info.image" 
            mode='aspectFill'>
        <img class="img" 
             :src="test.user_info.image"
             mode="aspectFit">
             <p class="uName">
                {{test.user_info.ncName}}
            </p>
        </div>
        <div class="tag">
            {{test.deptName}}
        </div>
        <div class="title">
            <input v-model.lazy='title' type="text" :value="test.title" :autofocus="focus">
        </div>
        <div class="choice">
            A.<input v-model.lazy='choiceA' type="text" :value="test.choiceA" :autofocus="focus">
        </div>
        <div class="choice">
            B.<input v-model.lazy='choiceB' type="text" :value="test.choiceB" :autofocus="focus">
        </div>
        <div class="choice">
            C.<input v-model.lazy='choiceC' type="text" :value="test.choiceC" :autofocus="focus">
        </div>
        <div class="choice">
            D.<input v-model.lazy='choiceD' type="text" :value="test.choiceD" :autofocus="focus">
        </div>
        <div class="choice">
            答案：<input v-model.lazy='answer' type="text" :value="test.answer" :autofocus="focus">
        </div>
        <button class="btn" @click="updateTe">确认修改</button>
    </div>
</div>
</template>

<script>

import {get} from '@/util'

export default {
  data () {
    return {
      userinfo: '',
      testId: '',
      tests: [],
      focus: ''

    }
  },
  methods: {
    async getDetail () {
      const tests = await get('/weapp/testDetail', {id: this.testId})
      this.tests = tests.list
      console.log(tests)
    },
    async updateTe () {
      const data = {
        id: this.testId,
        title: this.title,
        choiceA: this.choiceA,
        choiceB: this.choiceB,
        choiceC: this.choiceC,
        choiceD: this.choiceD,
        answer: this.answer
      }
      console.log(data)
      await get('/weapp/updateTest', data)
      wx.navigateTo({
        url: '/pages/me/main'
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
    console.log(this.testId)
    this.getDetail()
  },
  onShow () {
    this.focus = true
  }

}
</script>

<style lang="scss" scoped>
.testInfo{
    width: 100%;
    margin-bottom: 10rpx;
    .thumb{
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;
    .back{
        filter: blur(10px);
        width: 100%;
        z-index: 1;
    }
    .img{
        position: absolute;
        width: 150rpx;
        height: 150rpx;
        left: 40%;
        top: 100rpx;
        border-radius: 50%;
    }
    }
}
.uName{
    position: absolute;
    width: 100%;
    text-align: center;
    color: white;
    left: 0;
    top: 300rpx;
}
.tag{
    margin: 30rpx;
    width: 70rpx;
    font-size: 24rpx;
    height: 40rpx;
    text-align: center;
    color: red;
    border: 2rpx solid red;
    border-radius: 10%;
}

input{
    width: 50%;
    margin-top: 10rpx;
    margin-bottom: 15rpx;
    background-color: rgb(250, 245, 171);
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

.title{
    width: 100%;
    margin: 20rpx 30rpx;
}
.choice{
    float: left;
    width: 100%;
    margin-top: 20rpx;
    margin-left: 60rpx;
}
</style>
