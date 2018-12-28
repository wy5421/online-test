<template>
    <div class="content">
        <div class="formerTest">     
            <div class="title">
                我答过的
                <a href="/pages/formertest/main"><div class="more"></div></a>
            </div>
            <UserFormerTest :key="formertest" v-for="formertest in formerTest" :formertest="formertest"></UserFormerTest>
        </div>
        <div class="userTest">
            <div class="title">我发布的<a href="/pages/owntest/main"><div class="more"></div></a></div>
            <UserOwnTest :key="usertest.id" v-for="usertest in userTest" :usertest="usertest"></UserOwnTest>
        </div>
    </div>
</template>

<script>

import {get} from '@/util'
import UserOwnTest from '@/components/UserOwnTest'
import UserFormerTest from '@/components/UserFormerTest'

export default {
  components: {
    UserOwnTest,
    UserFormerTest
  },
  data () {
    return {
      userTest: [],
      formerTest: []
    }
  },
  methods: {
    async getUserTest () {
      const userTest = await get('/weapp/getUserTest', {id: this.userinfo.openId})
      this.userTest = userTest.list
    },
    async getUserFormerTest () {
      const formerTest = await get('/weapp/getUserFormerTest', {id: this.userinfo.openId})
      this.formerTest = formerTest.list
    }
  },
  onPullDownRefresh () {
    wx.showNavigationBarLoading()
    console.log('下拉')
    this.getUserTest()
    this.getUserFormerTest()
    wx.stopPullDownRefresh()
    wx.hideNavigationBarLoading()
  },
  mounted () {
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
    this.getUserTest()
    this.getUserFormerTest()
  },
  computed: {
    formerUrl () {
      return '/pages/formertest/main'
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
    width: 100%;
}

a :hover{
    background-color: whitesmoke;
}

.title{
    width: 100%;
    font-size: 32rpx;
    margin: 10rpx 30rpx;
    position: relative;
}

.more{
    position: absolute;
    top: 24%;
    left: 18%;
    width: 15rpx;
    height: 15rpx;
    border-right: 4rpx solid gray;
    border-top: 4rpx solid gray;
    transform: rotate(45deg);
}

.ownTest{
    width: 96%;
    margin: 20rpx auto;
    color: white;
    background-color: rgb(153, 212, 230);
    border-radius: 2%;
    position: relative;
}

.atentTest{
    width: 96%;
    margin: 20rpx auto;
    color: white;    
    background-color: rgb(252, 180, 184);
    border-radius: 2%;
    position: relative;
}

.testInfo{
    width: 100%;
    font-size: 28rpx;
    margin: 10rxp 40rpx;
    padding-bottom: 10rpx;
    .uImage{
        width: 42rpx;
        height: 42rpx;
        border-radius: 50%;
        margin-right: 30rpx;
    }
}

.tesTitle{
    width: 70%;
    padding-top: 15rpx;
    font-size: 42rpx;
    margin: 20rpx 30rpx;
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

.countMsg{
    position: absolute;
    width: 15%;
    right: 10rpx;
    top: 80rpx;
    text-align: center;
    font-size: 24rpx;
    color: white;
}
</style>
