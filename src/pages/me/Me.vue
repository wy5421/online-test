<template>
  <div>
    <div class="userBgp">
      <div class="userInfo">
        <div class="img">
          <img :src="userinfo.avatarUrl">
        </div>
        <div class="uName">
          <p v-if="userinfo.openId">{{userinfo.nickName}}</p>
          <button v-else open-type="getUserInfo" lang="zh_CN" @getuserinfo="login" class="btn">点击登录</button>
        </div>
      </div>
    </div>
    <div class="yearTitle">
        <div class="year">
        <YearProgress></YearProgress>
        </div>
    </div>
    <div class="secLine">
      <div class="secTitle"><p>功能列表</p></div>
      <div>
        <FunctionList></FunctionList>
      </div>
    </div>
    <!-- <button class="btn" @click="swichTo">发布试卷</button> -->
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import { showSuccess } from '@/util'
import YearProgress from '@/components/YearProgress'
import config from '@/config'
import FunctionList from '@/components/FunctionList'

export default {
  components: {
    YearProgress,
    FunctionList
  },
  data () {
    return {
      currentTab: 0,
      userinfo: {
        avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
        nickName: ''
      }
    }
  },
  methods: {
    loginSuccess (res) {
      showSuccess('登录成功')
      wx.setStorageSync('userinfo', res)
      this.userinfo = res
    },
    login () {
      wx.showToast({
        title: '登录中',
        icon: 'loading'
      })
      qcloud.setLoginUrl(config.loginUrl)
      const session = qcloud.Session.get()
      if (session) {
        qcloud.loginWithCode({
          success: res => {
            console.log('没过期的登录', res)
            this.loginSuccess(res)
          },
          fail: err => {
            console.error(err)
          }
        })
      } else {
        qcloud.login({
          success: res => {
            console.log('登录成功', res)
            this.loginSuccess(res)
          },
          fail: err => {
            console.error(err)
          }
        })
      }
    },
    swichTo () {
      console.log('*****')
      wx.navigateTo({
        url: '/pages/addTest/main'
      })
    }
  },
  onShow () {
    let userinfo = wx.getStorageSync('userinfo')
    console.log(userinfo)
    if (userinfo) {
      this.userinfo = userinfo
      console.log(userinfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.userBgp {
  width: 100%;
  height: 450rpx;
  background-size: 100% 100%;
  background-image: url("http://r.photo.store.qq.com/psb?/V1062PSb3al05A/Atv9eIK*nN4WdbGBNelzeVGAshM0UxViVsvUBhT2LkE!/r/dDQBAAAAAAAA");
}

.userInfo {
  width: 100%;
  height: 450rpx;
  display: flex;
  flex-flow: column wrap;
  background-color: rgba(87, 87, 87, 0.3);
}

.img {
  width: 140rpx;
  height: 140rpx;
  border: 2rpx solid rgb(238, 235, 235);
  border-radius: 50%;
  order: 1;
  margin-top: 100rpx;
  margin-left: 80rpx;
}
.img image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.uName {
  width: 100%;
  height: 45rpx;
  color: rgb(24, 7, 7);
  order: 2;
  margin: 10rpx 30rpx;
  .btn{
      width: 50%;
  }
}

.tab-active{
    color: red;
}

.yearTitle{
    width: 100%;
    height: 200rpx;
    margin-top: 5rpx;
    background-color: rgb(236, 245, 248);
    position: relative;
    display: block;
}

.year{
    width: 90%;
    margin: 20rpx auto;
    padding-top: 30rpx;
    text-align: center;
    color: rgb(245, 173, 79);
}

.secLine{
    width: 100%;
    height: 300rpx;
    margin: 30rpx auto;
    position: relative;
}

.secTitle{
  width: 30%;
  height: 30rpx;
  border-left: 4rpx solid red;
  p{
    padding-left: 30rpx;
    font-size: 28rpx;
  }
}

.btn{
    width: 95%;
    height: 100rpx;
    margin: 10rpx auto;
    color: white;
    background-color: rgb(34, 138, 34);
}

.btn:active{
    background-color: rgb(17, 66, 17);
}

</style>
