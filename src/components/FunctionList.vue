<template>
<div>
  <div class="guideList" :key="index" v-for="(guide,index) in guide" >
    <div class="info" @click="functionDetail(guide)">
      <div class="funcBox">
        <div class="icon"><img :src="guide.url" class="image"></div>
        <div class="title">{{guide.title}}</div>
      </div>
    </div>
  </div>
  <div v-if="getLog">
  <div class="functionList" :key="index" v-for="(box,index) in boxes">
    <div class="info" @click="functionDetail(box)">
      <div class="funcBox">
        <div class="icon"><img :src="box.url" class="image"></div>
        <div class="title">{{box.title}}</div>
      </div>
    </div>
  </div>
  </div>
  <div v-if="showAdmin">
    <div class="guideList" :key="index" v-for="(admin,index) in admin">
    <div class="info" @click="functionDetail(admin)">
      <div class="funcBox">
        <div class="icon"><img :src="admin.url" class="image"></div>
        <div class="title">{{admin.title}}</div>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>

import {get} from '@/util'

export default {
  data () {
    return {
      userinfo: '',
      adminList: '',
      guide: [{url: '/static/img/setting.png', title: '使用指南', intro: '欧哈娜的使用手册', naviUrl: '/pages/introduction/main'}],
      admin: [
        {url: '/static/img/setting.png', title: '用户列表', intro: '赋予用户超级管理员', naviUrl: '/pages/userlist/main'},
        {url: '/static/img/setting.png', title: '管理员', intro: '查看超级管理员', naviUrl: '/pages/usermanage/main'}],
      boxes: [
        {url: '/static/img/greatwall.png', title: '发布试题', intro: '点击前往发布你的试题', naviUrl: '/pages/addTest/main'},
        {url: '/static/img/moon.png', title: '个人题库', intro: '点击查看你发布的试题', naviUrl: '/pages/owntest/main'},
        {url: '/static/img/robot.png', title: '历史考试', intro: '点击可以查看你回答过的试题', naviUrl: '/pages/formertest/main'},  
      ]
    }
  },
  computed:{
    getLog(){
      if(!this.userinfo.openId){
        return false
      }else{
        return true
      }
    },
    showAdmin(){
      if(this.adminList.length>0){
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    async isAdmin(){
      const adminList = await get('/weapp/isAdmin', {openId: this.userinfo.openId})
      this.adminList = adminList
      console.log(123,adminList)
    },
    functionDetail (item) {
      wx.navigateTo({
        url: item.naviUrl
      })
    }
  },
  mounted(){
    const userinfo = wx.getStorageSync('userinfo')
    if(userinfo){
      this.userinfo = userinfo
      this.isAdmin()
    }
  }
}
</script>

<style lang='scss' scoped>
.guideList{
  width: 96%;
  margin: 2rpx auto;
}
.functionList{
  width: 96%;
  margin: 2rpx auto;

}
.info{
  width: 20%;
  margin-top: 20rpx;
  margin-left: 30rpx;
  margin-bottom: 10rpx;
  text-align: center;
  float: left;
}

.iocn{
  width: 100%;
  text-align: center;
  margin: 2rpx auto;
  }  
.image{
  width: 55rpx;
  height: 55rpx;
  border-radius: 50%;
}
.title{
  font-size: 28rpx;
  width: 100%;
}

</style>
